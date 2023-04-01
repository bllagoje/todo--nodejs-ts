import { RequestHandler } from "express"
import { Todo } from "../models/todo"

const TODOS: Todo[] = []

// Post
export const createTodo: RequestHandler = (req, res, next) => {
    let text = (req.body as {text: string}).text
    let newTodo = new Todo(Math.random().toString(), text)

    TODOS.push(newTodo)
    res.status(201).json({ message: "Created the todo", creatdTodo: newTodo })
}

// Get
export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS })
}

// Patch (Update)
export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    let todoId = req.params.id
    let updatedText = (req.body as { text: string }).text
    let todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if(todoIndex < 0) {
        throw new Error("Could not find todo.")
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex]})
}

// Delete
export const deleteTodo: RequestHandler = (req, res, next) => {
    let todoId = req.params.id
    let todoIndex = TODOS.findIndex(todo => todo.id === todoId)
    
    if(todoIndex < 0) {
        throw new Error("Could not find todo.")
    }

    TODOS.splice(todoIndex, 1)

    res.json({ message: "Todo deleted!" })
}
