import randomChar from "./randomChar";

export default function randomStr(length = 0) {
  let usrName = "";
  while (length--) usrName += randomChar();
  return usrName;
}
