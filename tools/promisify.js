export default function promisify(fn) {
  return (...args) => new Promise((resolve, reject) => {
    function finish(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    }

    fn(...args.concat(finish));
  });
}
