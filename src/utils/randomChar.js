import random from "./randomInt";

const charSeqs = ["az", "AZ", "09"];

export default function randomChar() {
  const charSeq = charSeqs[random(charSeqs.length - 1)];
  const charSeqStart = charSeq.charCodeAt(0);
  const charSeqEnd = charSeq.charCodeAt(1);
  const charCode = charSeqStart + random(charSeqEnd - charSeqStart);
  return String.fromCharCode(charCode);
}
