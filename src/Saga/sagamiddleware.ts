export const DEFERRED = Symbol("DEFERRED");

const createExposedPromise = () => {
  const deferred: {
    resolve: any;
    reject: any;
  } = { resolve: null, reject: null };

  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return [promise, deferred];
};

export default (store: any) => (next: any) => (action: any) => {
  if (!action[DEFERRED]) {
    return next(action);
  }
  const [promise, deferred] = createExposedPromise();
  next({ ...action, [DEFERRED]: deferred });
  return promise;
};
