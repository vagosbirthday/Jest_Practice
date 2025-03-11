const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controllers");
// Obtener todas las tareas
router.get("/", todoController.getAllTodos);
// Crear una nueva tarea
router.post("/", todoController.createTodo);
// Obtener estadísticas de tareas
router.get("/stats", todoController.getTodoStats);
// Buscar tareas por título
router.get("/search", todoController.searchTodos);
// Obtener una tarea por ID
router.get("/:id", todoController.getTodoById);
// Actualizar una tarea
router.put("/:id", todoController.updateTodo);
// Eliminar una tarea
router.delete("/:id", todoController.deleteTodo);
// Marcar una tarea como completada
router.patch("/:id/complete", todoController.completeTodo);
module.exports = router;
