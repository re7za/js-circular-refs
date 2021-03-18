import { TAnyObj } from "../types";
import { ID_PROP_NAME, REF_PROP_NAME } from "../constants";
import isPureObj from "./isPureObj";

interface IRetrieveOptions {
  modifyObj?: boolean;
  refPropName?: string;
  idPropName?: string;
}

const isArray = (obj: TAnyObj) => {
  const keys = Object.keys(obj);
  let isArray = true;
  for (let i = 0; i < keys.length; i++) {
    if (i !== Number(keys[i])) {
      isArray = false;
      break;
    }
  }

  return isArray;
};

const objToArrConverter = (obj: TAnyObj) => {
  return Object.keys(obj).map((key) => obj[key]);
};

export default function retrieve(decycledObj: TAnyObj, options?: IRetrieveOptions): TAnyObj {
  const ids = new Map<string, TAnyObj>();
  const { modifyObj, refPropName, idPropName }: IRetrieveOptions = {
    modifyObj: options?.modifyObj ?? false,
    refPropName: options?.refPropName ?? REF_PROP_NAME,
    idPropName: options?.idPropName ?? ID_PROP_NAME
  };

  const result: TAnyObj = (function objTreeIterator(obj: TAnyObj): TAnyObj {
    const result: TAnyObj = modifyObj ? obj : { ...obj };
    const objId: string = result[idPropName];

    ids.set(objId, result);
    delete result[idPropName];

    for (const [key, subObj] of Object.entries(result)) {
      if (Array.isArray(subObj)) {
        if (refPropName in subObj) {
          console.log(subObj);
          // const bit = ids.get(subObj[refPropName]);
          // console.log(bit);
          result[key] = [];
        } else {
          const iteratedObjTree = objTreeIterator(subObj);
          const retrievedArr: any[] = [];
          const objKeys = Object.keys(iteratedObjTree);
          objKeys.forEach((i) => {
            if (Number(i) < objKeys.length - 1) retrievedArr.push(iteratedObjTree[i]);
          });
          result[key] = retrievedArr;
        }
      }
      if (!isPureObj(subObj)) continue;
      if (refPropName in subObj) {
        result[key] = ids.get(subObj[refPropName]);
      } else if (idPropName in subObj) {
        result[key] = objTreeIterator(subObj);
      }
    }

    return result;
  })(decycledObj);

  return result;
}
