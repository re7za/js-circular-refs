import random from "./randomInt";

const charSeqs: string[] = ["az", "AZ", "09"];

export default function randomChar(): string {
  const charSeq: string = charSeqs[random(charSeqs.length - 1)];
  const charSeqStart: number = charSeq.charCodeAt(0);
  const charSeqEnd: number = charSeq.charCodeAt(1);
  const charCode: number = charSeqStart + random(charSeqEnd - charSeqStart);
  return String.fromCharCode(charCode);
}
