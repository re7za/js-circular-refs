import { REF_ID_LENGTH, ID_PROP_NAME, REF_PROP_NAME } from "../constants";
import { TAnyObj } from "../types";

import randomStr from "./randomStr";
import isPureObj from "./isPureObj";

interface IDecycleOptions {
  modifyObj?: boolean;
  refIdLength?: number;
  refPropName?: string;
  idPropName?: string;
}

export default function decycle(circularObj: TAnyObj, options?: IDecycleOptions): TAnyObj {
  const refs = new Map<TAnyObj, string>();
  const { modifyObj, refIdLength, refPropName, idPropName }: IDecycleOptions = {
    modifyObj: options?.modifyObj ?? false,
    refIdLength: options?.refIdLength ?? REF_ID_LENGTH,
    refPropName: options?.refPropName ?? REF_PROP_NAME,
    idPropName: options?.idPropName ?? ID_PROP_NAME
  };

  const result: TAnyObj = (function objTreeIterator(obj: TAnyObj): TAnyObj {
    const result: TAnyObj = modifyObj ? obj : { ...obj };
    const objId = randomStr(refIdLength);

    refs.set(obj, objId);
    result[idPropName] = objId;

    for (const [key, subObj] of Object.entries(result)) {
      if (Array.isArray(subObj)) {
        if (refs.has(subObj)) {
          result[key] = [...subObj];
        } else {
          const iteratedObjTree = objTreeIterator(subObj);
          result[key] = Object.keys(iteratedObjTree).map((k) => iteratedObjTree[k]);
        }
      }
      if (!isPureObj(subObj)) continue;
      if (refs.has(subObj)) {
        const subObjId = refs.get(subObj);
        result[key] = { [refPropName]: subObjId };
      } else {
        result[key] = objTreeIterator(subObj);
      }
    }
    return result;
  })(circularObj);

  return result;
}
