import { TAnyObj } from "../types";
import { ID_PROP_NAME, REF_PROP_NAME } from "../constants";
import isPureObj from "./isPureObj";

export default function retrieve(decycledObj: TAnyObj, modifyObj: boolean = false): TAnyObj {
  const ids = new Map<string, TAnyObj>();

  const result: TAnyObj = (function objTreeIterator(obj: TAnyObj): TAnyObj {
    const result: TAnyObj = modifyObj ? obj : { ...obj };
    const objId: string = result[ID_PROP_NAME];

    ids.set(objId, result);
    delete result[ID_PROP_NAME];

    for (const [key, subObj] of Object.entries(result)) {
      if (!isPureObj(subObj)) continue;
      if (REF_PROP_NAME in subObj) {
        result[key] = ids.get(subObj[REF_PROP_NAME]);
      } else if (ID_PROP_NAME in subObj) {
        result[key] = objTreeIterator(subObj);
      }
    }

    return result;
  })(decycledObj);

  return result;
}
