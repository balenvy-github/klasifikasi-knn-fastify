export default function errorTesting(predicted: any, expected: any) {
  let misclassifications = 0;
  for (let index = 0; index < predicted.length; index += 1) {
    const innerArrayLength = predicted[index].length;
    for (let j = 0; j < innerArrayLength; j += 1) {
      if (predicted[index][j] !== expected[index][j]) {
        misclassifications += 1;
      }
    }
  }
  return misclassifications;
}
