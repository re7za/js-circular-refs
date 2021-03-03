import randomChar from "./randomChar";

export default function randomStr(length: number = 0): string {
  let str: string = "";
  while (length--) str += randomChar();
  return str;
}
