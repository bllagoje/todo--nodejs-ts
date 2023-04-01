import { Router } from "express"
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todos"

const router = Router()

// Post
router.post("/", createTodo)

// Get
router.get("/", getTodos)

// Patch (Update)
router.patch("/:id", updateTodo)

// Delete
router.delete("/:id", deleteTodo)


// -------------------------------
// Export
export default router
