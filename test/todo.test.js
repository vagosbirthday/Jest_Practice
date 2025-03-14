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
    const response = await request(app).post("/api/todos").send(newTask);
    expect(response.body).toHaveProperty("title");
    console.log(response.body);
    expect(response.status).toBe(201);
  });

  // Prueba para verificar que no se pueda crear una tarea sin título
  test("POST /api/todos debería devolver un error 400 cuando no se proporciona un título", async () => {
    const newTask = {
      description: "No titulo",
    }
    const response = await request(app).post("/api/todos").send(newTask);
    console.log(response.body);
    expect(response.status).toBe(400)
  });

  // Prueba para obtener todas las tareas
  test("GET /api/todos debería devolver un array de tareas con la estructura correcta", async () => {
    const response = await request(app).get("/api/todos");
    console.log(response.body);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });

  // Prueba para obtener una tarea por ID
  test("GET /api/todos/:id debería devolver la tarea correcta cuando se proporciona un ID válido", async () => {
    const response = await request(app).get("/api/todos");
    console.log(response.body);  
    const response2 = await request(app).get("/api/todos/67d323753190f2f91bb34cab");
    console.log(response2.body); 
    expect(response2.status).toBe(200); 
    expect(response2.body).toHaveProperty("_id", "67d323753190f2f91bb34cab"); 
  });
  

  // Prueba para manejar IDs inexistentes
  test("GET /api/todos/:id debería devolver un error 404 cuando el ID no existe", async () => {
    const response = await request(app).get("/api/todos");
    const response2 = await request(app).get("/api/todos/67d3206ae38991867308e69a");
    console.log(response2.body);
    expect(response2.status).toBe(404)
  });

  // Prueba para eliminar una tarea existente
  test("DELETE /api/todos/:id debería eliminar correctamente una tarea existente", async () => {
    const response = await request(app).get("/api/todos");
    console.log(response.body);
    const newTask = { 
      title: "Post2", 
      description: "tarea 2", 
    };
    const response2 = await request(app).post("/api/todos").send(newTask);
    console.log("creado para borrar2",response2.body)
    expect(response2.body).toHaveProperty("_id");
    const id = response2.body._id;
    const response3 = await request(app).delete(`/api/todos/${id}`);
    console.log("se ah borrado",response3.body);
    expect(response3.body).toHaveProperty("message", "Tarea eliminada correctamente");
    const response4 = await request(app).get(`/api/todos/${id}`);
    console.log("no se encontro el borrado:",response4.body)
    expect(response4.status).toBe(404);
  });

  // Prueba para marcar una tarea como completada
  test("PATCH /api/todos/:id/complete debería marcar correctamente una tarea como completada", async () => {
    const response = await request(app).get("/api/todos");
    console.log(response.body);
    const newTask = { 
      title: "Post5", 
      description: "tarea 5", 
    };
    const response2 = await request(app).post("/api/todos").send(newTask);
    console.log(response2.body);
    expect(response2.body).toHaveProperty("_id");
    const id = response2.body._id;
    const update = { completed: true };
    const response3 = await request(app).patch(`/api/todos/${id}`).send(update);
    console.log(response3.body);
    console.log(response3.status);
});

  // Prueba para la búsqueda de tareas por título
  test("GET /api/todos/search debería devolver tareas cuyos títulos coincidan con el término de búsqueda", async () => {
    const searchTerm = "buscar";
    const response = await request(app).get(`/api/todos/search?title=${searchTerm}`);
    console.log("Resultado de la búsqueda:", response.body); 
    expect(response.status).toBe(200); 
    expect(response.body.length).toBeGreaterThan(0); 
  });
  
  test("Solicitar una ruta inexistente debería devolver un error 404", async () => {
    const response = await request(app).get("/api/todoss");
    console.log("Resultado: ",response.status);
    expect(response.status).toBe(404)
  });

  // Prueba para obtener estadísticas de tareas
  test("GET /api/todos/stats debería devolver las estadísticas correctas de las tareas", async () => {
    const response = await request(app).get("/api/todos/stats");
    console.log(response.body);
    expect(response.body).toHaveProperty("total"); 
    expect(response.body).toHaveProperty("completed"); 
    expect(response.body).toHaveProperty("pending"); 
    expect(response.body).toHaveProperty("completionRate"); 
  });
});
