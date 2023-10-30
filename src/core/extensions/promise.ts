Promise.prototype.toArray = function<T, U = Error>(this: Promise<T>): Promise<[U | null, T | undefined]> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return this
    .then((data: T) => { return [null, data]; })
    .catch((err: U) => { return [err, undefined]; });
};
