const now = Number(new Date());
let index = 0;

export default function getUid() {
  return `muya-uploadfile-${now}-${++index}`;
}
