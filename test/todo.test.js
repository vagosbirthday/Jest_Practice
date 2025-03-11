const todo = require("./../models/Todo");
const request = require("supertest");
const app = require("../app");

describe("Pruebas de la API", () => {
  test("GET /health debería devolver estado 200", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  test("POST /api/todos debería crear una nueva tarea con un título válido", async () => {
    const newTask = {
      title: "Post",
      description: "tarea 2",
    };
    const response = await request(app).post("/api/todos").send(newTask);
    expect(response.status).toBe(201);
  });

  test("POST /api/todos debería devolver un error 400 cuando no se proporciona un título", async () => {
    const newTask = {
      description: "Descripción de la nueva tarea sin título",
    };
    const response = await request(app).post("/api/todos").send(newTask);
    expect(response.status).toBe(400);
  });

  test("GET /api/todos debería devolver un array de tareas con la estructura correcta", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.status).toBe(200);
  });

  test("GET /api/todos/:id debería devolver la tarea correcta cuando se proporciona un ID válido", async () => {
    const newTask = { title: "Tarea a buscar", description: "Descripción" };
    const createdTask = await request(app).post("/api/todos").send(newTask);
    const response = await request(app).get(
      `/api/todos/${createdTask.body._id}`
    );
    expect(response.status).toBe(200);
  });

  test("GET /api/todos/:id debería devolver un error 404 cuando el ID no existe", async () => {
    const response = await request(app).get(
      "/api/todos/660000000000000000000000"
    );
    expect(response.status).toBe(404);
  });

  test("PUT /api/todos/:id debería actualizar correctamente una tarea existente", async () => {
    
  });

  test("DELETE /api/todos/:id debería eliminar correctamente una tarea existente", async () => {
    const newTask = {
      title: "Tarea a eliminar",
      description: "Será eliminada",
    };
    const createdTask = await request(app).post("/api/todos").send(newTask);

    const response = await request(app).delete(
      `/api/todos/${createdTask.body._id}`
    );
    expect(response.status).toBe(200);
  });

  test("PATCH /api/todos/:id/complete debería marcar correctamente una tarea como completada", async () => {
    const newTask = {
      title: "Tarea incompleta",
      description: "Debe ser completada",
    };
    const createdTask = await request(app).post("/api/todos").send(newTask);

    const response = await request(app).patch(
      `/api/todos/${createdTask.body._id}/complete`
    );
    expect(response.status).toBe(200);
  });

  test("GET /api/todos/search debería devolver tareas cuyos títulos coincidan con el término de búsqueda", async () => {
    const searchTerm = "buscar";
    await request(app)
      .post("/api/todos")
      .send({ title: "Tarea para buscar", description: "Test búsqueda" });
    const response = await request(app).get(
      `/api/todos/search?title=${searchTerm}`
    );
    expect(response.status).toBe(200);
  });

  test("Solicitar una ruta inexistente debería devolver un error 404", async () => {
    const response = await request(app).get("/api/no-existe");
    expect(response.status).toBe(404);
  });

  test("GET /api/todos/stats debería devolver las estadísticas correctas de las tareas", async () => {
    const response = await request(app).get("/api/todos/stats");
    expect(response.status).toBe(200);
  });
});
