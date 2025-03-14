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
    //Conseguir datos
    const datos = await request(app).get("/api/todos");
    console.log("El status de ejercicio 1 son: ", datos.status);
    console.log("Los datos de ejercicio 1 son: ", datos.body);
    //Creamos el nuevo dato
    const nuevoT = {
      title: "Nueva Tarea"
    }
    //Enviar el dato
    const envio = await request(app).post("/api/todos").send(nuevoT);
    //Comprobar que se envio
    console.log("El estatus es",envio.status);
    console.log("el body es", envio.body);
    //Expect
    expect(envio.status).toBe(201);
    expect(envio.body).toHaveProperty("title");
  });

  // Prueba para verificar que no se pueda crear una tarea sin título
  test("POST /api/todos debería devolver un error 400 cuando no se proporciona un título", async () => {

  });

  // Prueba para obtener todas las tareas
  test("GET /api/todos debería devolver un array de tareas con la estructura correcta", async () => {

  });

  // Prueba para obtener una tarea por ID
  test("GET /api/todos/:id debería devolver la tarea correcta cuando se proporciona un ID válido", async () => {

  });
  

  // Prueba para manejar IDs inexistentes
  test("GET /api/todos/:id debería devolver un error 404 cuando el ID no existe", async () => {

  });

  // Prueba para eliminar una tarea existente
  test("DELETE /api/todos/:id debería eliminar correctamente una tarea existente", async () => {

  });

  // Prueba para marcar una tarea como completada
  test("PATCH /api/todos/:id/complete debería marcar correctamente una tarea como completada", async () => {

});

  // Prueba para la búsqueda de tareas por título
  test("GET /api/todos/search debería devolver tareas cuyos títulos coincidan con el término de búsqueda", async () => {

  });
  
  test("Solicitar una ruta inexistente debería devolver un error 404", async () => {

  });

  // Prueba para obtener estadísticas de tareas
  test("GET /api/todos/stats debería devolver las estadísticas correctas de las tareas", async () => {

  });
});
