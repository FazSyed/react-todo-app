import React, { useState } from "react";
import "./Todo.css";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = async () => {
    // Update the Todo with the new input text
    const todoRef = doc(db, "todos", props.task.id);
    await updateDoc(todoRef, {
      todo: input,
    });

    setOpen(false);
    setInput("");
  };

  return (
    <div className="todo">
      <Modal
        className="todo__modal"
        open={open}
        onClose={(e) => setOpen(false)}
        sx={style}
      >
        <div>
          <h1 className="todo__update">UPDATE TODO</h1>
          <input
            className="todo__input"
            placeholder={props.task.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            className="todo__btn"
            onClick={updateTodo}
            variant="contained"
            color="secondary"
          >
            ENTER
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={props.task.todo} />
        </ListItem>

        <Button
          className="todo__btn"
          variant="outlined"
          color="secondary"
          onClick={(e) => setOpen(true)}
          startIcon={<EditIcon />}
        >
          EDIT
        </Button>

        <Button
          onClick={async () => {
            const docRef = doc(db, "todos", props.task.id);
            await deleteDoc(docRef);
          }}
          startIcon={<DeleteIcon />}
          variant="outlined"
          className="todo__btn"
        >
          DELETE
        </Button>
      </List>
    </div>
  );
};

export default Todo;
