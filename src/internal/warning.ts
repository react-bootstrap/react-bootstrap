const __DEV__ = process.env.NODE_ENV !== 'production';

function printWarning(message: string) {
  if (typeof console !== 'undefined') {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch {
    // Ignore the error.
  }
}

export function warn(condition: boolean, message: string) {
  if (!__DEV__) {
    return;
  }
  if (!condition) {
    printWarning(message);
  }
}

const messages = new Set<string>();
export function warnOnce(condition: boolean, message: string) {
  if (!__DEV__) {
    return;
  }
  if (!condition) {
    if (messages.has(message)) {
      return;
    }
    messages.add(message);
    printWarning(message);
  }
}
