const router = require('express').Router();

module.exports = (api) => {
  router.get('/', api.actions.todos.findAll);
  router.get('/:id', api.actions.todos.findOne);
  router.post('/', api.actions.todos.create);
  router.put('/:id', api.actions.todos.update);
  router.delete('/:id', api.actions.todos.remove);

  return router;
}
