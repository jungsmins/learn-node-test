const createMiddleware = () => {
  const _middlewares = [];
  let _req, _res;

  const add = (mw) => {
    _middlewares.push(mw);
  };

  const run = (req, res) => {
    _req = req;
    _res = res;
    _run(0);
  };

  const _run = (index, err) => {
    if (index < 0 || index >= _middlewares.length) return;

    const nextMw = _middlewares[index];
    const next = (err) => _run(index + 1, err);

    if (err) {
      const isErrorHandler = nextMw.length === 4;

      return isErrorHandler
        ? nextMw(err, _req, _res, next)
        : _run(index + 1, err);
    }

    nextMw(_req, _res, next);
  };

  return {
    _middlewares,
    add,
    run,
  };
};

module.exports = createMiddleware;
