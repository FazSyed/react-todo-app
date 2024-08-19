import { Button, FormControl, Input, InputLabel } from "@mui/material";
import "./App.css";
import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to the db and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app loads
    const todosQuery = query(
      collection(db, "todos"),
      orderBy("timestamp", "desc")
    ); // Reference to the 'todos' collection

    onSnapshot(todosQuery, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
      );
    });
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // stop the page from refreshing

    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });

    // setTodos([...todos, input]);
    setInput(""); // clear up the input after hitting enter
  };

  return (
    <div className="app">
      <h1 className="app__heading">TODO APP</h1>
      <form className="app__form">
        {/* <input  />
        <button type="submit" onClick={addTodo}>
          Add Todo
        </button> */}

        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>

        <Button
          className="app__button"
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="success"
        >
          Add Todo
        </Button>
      </form>

      <ul className="app__todo">
        {todos.map((todo) => (
          <Todo task={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
