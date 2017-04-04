const router = require('express').Router()

module.exports = (api) => {

  router.get('/', api.actions.cars.list);
  router.get('/:id', api.actions.cars.show);
  router.post('/', api.actions.cars.create);
  router.put('/:id', api.actions.cars.update);
  router.delete('/:id', api.actions.cars.remove);

  return router;
}
