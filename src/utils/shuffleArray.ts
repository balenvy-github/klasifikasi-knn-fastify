export default function shuffleArray(array: any) {
  const data = array;
  for (let i = data.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }
  return data;
}
