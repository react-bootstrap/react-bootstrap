// eslint-disable-next-line import/prefer-default-export
export function shouldWarn(about) {
  console.error.expected.push(about);
}
