const todo = require("./../models/Todo"); // Importa el modelo de la base de datos
const request = require("supertest"); // Importa supertest para hacer peticiones HTTP
const app = require("../app"); // Importa la aplicación de Express

describe("Pruebas de la API", () => {
  // Prueba para verificar que el servidor está funcionando correctamente
  test("GET /health debería devolver estado 200", async () => {
    const response = await request(app).get("/health"); // Hace una petición GET a /health
    expect(response.status).toBe(200); // Verifica que el código de estado sea 200
    expect(response.body).toEqual({ status: "ok" }); // Verifica que la respuesta tenga el mensaje esperado
  });

  // Prueba para la creación de una nueva tarea con un título válido
  test("POST /api/todos debería crear una nueva tarea con un título válido", async () => {
    const newTask = {
      title: "Post", // Define el título de la tarea
      description: "tarea 2", // Define la descripción de la tarea
    };
    const response = await request(app).post("/api/todos").send(newTask); // Envía la petición POST con la tarea
    expect(response.status).toBe(201); // Verifica que la respuesta tenga código 201 (creado)
  });

  // Prueba para verificar que no se pueda crear una tarea sin título
  test("POST /api/todos debería devolver un error 400 cuando no se proporciona un título", async () => {
    const newTask = {
      description: "Descripción de la nueva tarea sin título", // Solo tiene descripción
    };
    const response = await request(app).post("/api/todos").send(newTask); // Envía la petición sin título
    expect(response.status).toBe(400); // Verifica que devuelva error 400 (petición incorrecta)
  });

  // Prueba para obtener todas las tareas
  test("GET /api/todos debería devolver un array de tareas con la estructura correcta", async () => {
    const response = await request(app).get("/api/todos"); // Hace la petición GET a /api/todos
    expect(response.status).toBe(200); // Verifica que la respuesta sea 200
    expect(Array.isArray(response.body)).toBe(true); // Verifica que el cuerpo de la respuesta sea un array
  });

  // Prueba para obtener una tarea por ID
  test("GET /api/todos/:id debería devolver la tarea correcta cuando se proporciona un ID válido", async () => {
    const newTask = { title: "Tarea a buscar", description: "Descripción" };
    const createdTask = await request(app).post("/api/todos").send(newTask); // Crea una nueva tarea
    const response = await request(app).get(
      `/api/todos/${createdTask.body._id}`
    ); // Solicita la tarea creada
    expect(response.status).toBe(200); // Verifica que la respuesta sea 200
    expect(response.body._id).toBe(createdTask.body._id); // Verifica que el ID sea el correcto
  });

  // Prueba para manejar IDs inexistentes
  test("GET /api/todos/:id debería devolver un error 404 cuando el ID no existe", async () => {
    const response = await request(app).get(
      "/api/todos/660000000000000000000000"
    ); // Usa un ID inexistente
    expect(response.status).toBe(404); // Verifica que devuelva error 404
  });

  // Prueba para eliminar una tarea existente
  test("DELETE /api/todos/:id debería eliminar correctamente una tarea existente", async () => {
    const newTask = {
      title: "Tarea a eliminar",
      description: "Será eliminada",
    };
    const createdTask = await request(app).post("/api/todos").send(newTask); // Crea una nueva tarea
    const response = await request(app).delete(
      `/api/todos/${createdTask.body._id}`
    ); // La elimina
    expect(response.status).toBe(200); // Verifica que la respuesta sea 200
  });

  // Prueba para marcar una tarea como completada
  test("PATCH /api/todos/:id/complete debería marcar correctamente una tarea como completada", async () => {
    const newTask = {
      title: "Tarea incompleta",
      description: "Debe ser completada",
    };
    const createdTask = await request(app).post("/api/todos").send(newTask); // Crea una nueva tarea
    const response = await request(app).patch(
      `/api/todos/${createdTask.body._id}/complete`
    ); // La marca como completada
    expect(response.status).toBe(200); // Verifica que la respuesta sea 200
    expect(response.body.completed).toBe(true); // Verifica que la tarea esté marcada como completada
  });

  // Prueba para la búsqueda de tareas por título
  test("GET /api/todos/search debería devolver tareas cuyos títulos coincidan con el término de búsqueda", async () => {
    const searchTerm = "buscar";
    await request(app)
      .post("/api/todos")
      .send({ title: "Tarea para buscar", description: "Test búsqueda" }); // Crea una tarea con ese término
    const response = await request(app).get(
      `/api/todos/search?title=${searchTerm}`
    ); // Busca tareas por título
    expect(response.status).toBe(200); // Verifica que la respuesta sea 200
    expect(response.body.length).toBeGreaterThan(0); // Verifica que haya resultados
  });

  // Prueba para manejar rutas inexistentes
  test("Solicitar una ruta inexistente debería devolver un error 404", async () => {
    const response = await request(app).get("/api/no-existe"); // Intenta acceder a una ruta inexistente
    expect(response.status).toBe(404); // Verifica que la respuesta sea 404
  });

  // Prueba para obtener estadísticas de tareas
  test("GET /api/todos/stats debería devolver las estadísticas correctas de las tareas", async () => {
    const response = await request(app).get("/api/todos/stats"); // Solicita estadísticas de tareas
    expect(response.status).toBe(200); // Verifica que la respuesta sea 200
    expect(response.body).toHaveProperty("total"); // Verifica que haya una propiedad "total"
    expect(response.body).toHaveProperty("completed"); // Verifica que haya una propiedad "completed"
    expect(response.body).toHaveProperty("pending"); // Verifica que haya una propiedad "pending"
  });
});
