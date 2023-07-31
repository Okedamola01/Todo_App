const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//Post route to create todo
router.post('/', todoController.createNewTodo);

//PUT route to update a todo
router.put('/:id', todoController.updateTodo);

//DELETE route to delete a todo
router.delete('/:id', todoController.deleteTodo);

//Get route to get all todo
router.get('/', todoController.getAllTodo);

module.exports = router;