import React, { useState, useEffect } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    traerTareas();
  }, []);

  const traerTareas = () => {
    fetch("https://playground.4geeks.com/todo/users/usuario")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          crearUsuario();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setTodos(data.todos);
      })
      .catch((error) => {
        console.error("Error al traer las tareas:", error);
      });
  };

  const crearUsuario = () => {
    fetch("https://playground.4geeks.com/todo/users/usuario", { method: "POST" })
      .then((response) => {
        console.log(response);
        traerTareas(); // Traer tareas después de crear al usuario
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      });
  };

  const agregarTarea = () => {
    if (input.trim() === "") return; // Evitar agregar tareas vacías

    fetch("https://playground.4geeks.com/todo/todos/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: input,
        done: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tarea agregada:", data);
        setTodos((prevTodos) => [...prevTodos, data]); // Actualizar la lista de tareas
        setInput(""); // Limpiar el campo de entrada
      })
      .catch((error) => {
        console.error("Error al agregar tarea:", error);
      });
  };

  const eliminarTodasLasTareas = () => {
    fetch("https://playground.4geeks.com/todo/todos/usuario", {
      method: "DELETE", // Método DELETE para eliminar todas las tareas
    })
      .then((response) => {
        if (response.ok) {
          console.log("Todas las tareas han sido eliminadas.");
          setTodos([]); // Vaciar el estado de las tareas
        } else {
          console.error("No se pudieron eliminar las tareas.");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar tareas:", error);
      });
  };

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">TODOs</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Agregar nueva tarea"
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>
      <div>
        <button onClick={eliminarTodasLasTareas}>Eliminar todas las tareas</button>
      </div>
      {todos.length === 0 ? (
        <p>No hay tareas aún.</p>
      ) : (
        todos.map((todo, index) => (
          <p key={index}>{todo.label}</p>
        ))
      )}
    </div>
  );
};

export default Home;
