import { REF_ID_LENGTH, ID_PROP_NAME, REF_PROP_NAME } from "../constants";
import { TAnyObj } from "../types";

import randomStr from "./randomStr";
import isPureObj from "./isPureObj";

export default function decycle(circularObj: TAnyObj): TAnyObj {
  const refs = new Map<TAnyObj, string>();

  const result: TAnyObj = (function objTreeIterator(obj: TAnyObj) {
    const result: TAnyObj = {};
    const objId = randomStr(REF_ID_LENGTH);

    refs.set(obj, objId);
    result[ID_PROP_NAME] = objId;

    for (const [key, subObj] of Object.entries(obj)) {
      if (!isPureObj(subObj)) continue;
      if (refs.has(subObj)) {
        const subObjId = refs.get(subObj);
        result[key] = { [REF_PROP_NAME]: subObjId };
      } else {
        result[key] = objTreeIterator(subObj);
      }
    }

    return result;
  })(circularObj);

  return result;
}
