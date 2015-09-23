export default function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      function finish(err, result) {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }

      fn.apply(null, args.concat(finish));
    });
  };
}
