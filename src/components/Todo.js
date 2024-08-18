import React from "react";
import "./Todo.css";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const Todo = ({ task }) => {
  return (
    <List className="todo__list">
      <ListItem>
        {/* <ListItemAvatar /> */}
        <ListItemText primary={task} secondary="Deadline" />
      </ListItem>
    </List>
  );
};

export default Todo;
