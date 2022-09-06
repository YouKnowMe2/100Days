const Todo = require('../models/todo.model');
async function getAllTodos(req,res,next){
    let todos;
    try{
        todos = await Todo.getAll();
    }catch(error){
        return next(error);
    }
    res.json({
        todos: todos
    });

}

async function addTodo(req,res,next){
    const todoText = req.body.text;
    const todo = new Todo(todoText);

    let insertId;
    try{
        const result =await todo.save();
        insertId = result.insertedId;
    }catch(error){
        return next(error);
    }
    todo.id = insertId.toString();

    res.json({
        message:'Added Successfully',createdTodo: todo
    });
}
async function updateTodo(req,res,next){
        const todoId = req.params.id;
        const todoText = req.body.text;
        const todo = new Todo(todoText,todoId);
        try{
            await todo.save();
        }catch(error){
            next(error);
        }
        res.json({message:'Todo Updated',updatedTodo: todo});


}
async function deleteTodo(req,res,next){
    const todoId = req.params.id;

    const todo = new Todo(null, todoId);
    try{
        await todo.delete();
    }catch(error){
        next(error);
    }
    res.json({message:'Todo Deleted',updatedTodo: todo});
}

module.exports = {
    getAllTodos: getAllTodos,
    addTodo: addTodo,
    updateTodo:  updateTodo,
    deleteTodo: deleteTodo,
}
