const Todo = require('../models/todo');

const createNewTodo = async (req, res) =>
{
    const { title, description } = req.body;
    if (!title)
    {
        return res.status(400).json({message: 'Todo title required!'});
    }
    try {
        const result = await Todo.create({
            title,
            description
        });
        res.status(201).json(result);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to create Todo'});
    }
}

const updateTodo = async (req, res) =>
{
    if(!req?.params?.id)
    {
        return res.status(400).json({message: 'ID parameter required!'});
    }

    const todo = await Todo.findOne({_id: req.params.id}).exec();
    if (!todo)
    {
        return res.status(204).json({message: `No Todo matches ${req.params.id}`});
    }
    if (req.body?.title) todo.title = req.body.title;
    if (req.body?.description) todo.description = req.body.description;
    const result = await todo.save();
    res.json(result);
    console.log(result);
}

const deleteTodo = async (req, res) =>
{
    if(!req?.params?.id)
    {
        return res.status(400).json({message: 'ID parameter is required!'});
    }
    const todo = await Todo.findOne({_id: req.params.id}).exec();
    if (!todo)
    {
        return res.status(204).json({message: `No Todo matches ${req.params.id}`});
    }
    const result = await todo.deleteOne({_id: req.params.id});
    res.json(result);
}

const getAllTodo = async (req, res) =>
{
    const todo = await Todo.find();
    if (!todo)
    {
        return res.status(204).json({message: 'No Todo found!'});
    }
    res.json(todo);
    console.log(todo);
}

module.exports = {
    createNewTodo,
    updateTodo,
    deleteTodo,
    getAllTodo
};