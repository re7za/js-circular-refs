import { TAnyObj } from "../types";
import { ID_PROP_NAME, REF_PROP_NAME } from "../constants";
import isPureObj from "./isPureObj";

interface IRetrieveOptions {
  modifyObj?: boolean;
  refPropName?: string;
  idPropName?: string;
}

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
