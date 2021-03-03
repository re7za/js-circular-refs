import { TAnyObj } from "./types";
import decycle from "./utils/decycle";

const a: TAnyObj = {};
const b: TAnyObj = {};

a.b = b;
b.a = a;

console.log(decycle(a));
