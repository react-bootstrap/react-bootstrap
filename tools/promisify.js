export default function promisify(fn){
  return function (...args){
    return new Promise(function(resolve, reject){
      function finish(err, result){
        if (err) {
          return reject(err);
        }
        resolve(result);
      }

      fn.apply(null, args.concat(finish));
    });
  };
}
