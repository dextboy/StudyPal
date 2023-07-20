import React, { useEffect, useState } from "react";
import "./style/ToDostyle.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { supabase } from "../supabase/client";
import { useAuth } from "../context/AuthProvider";
import { Paper } from "@mui/material";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div>
      <span style={{ textDecoration: todo.is_complete ? "line-through" : "" }}>
        {todo.task}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo() {
  const [value, setValue] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: value, user_id: user?.id }]);

    if (error) {
      console.error("Error adding todo:", error.message);
    } else {
      console.log("Todo added successfully:", data);
    }
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function TODO() {
  const [todos, setTodos] = useState([]);
  const { user } = useAuth();

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("user_id", user?.id);

    if (error) {
      console.error("Error fetching todos:", error.message);
    } else {
      setTodos(data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [user, todos]);

  const addTodo = async (text) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: text, user_id: user?.id }]);

    if (error) {
      console.error("Error adding todo:", error.message, user?.id);
    } else {
      setTodos([...todos, data[0]]);
    }
  };

  const markTodo = async (index) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ is_complete: true })
      .match({ id: todos[index].id });

    if (error) {
      console.error("Error marking todo as completed:", error.message);
    } else {
      const updatedTodos = [...todos];
      updatedTodos[index] = data[0];
      setTodos(updatedTodos);
    }
  };

  const removeTodo = async (index) => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ id: todos[index].id });

    if (error) {
      console.error("Error removing todo:", error.message);
    } else {
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Paper elevation={2}>
              <Card key={todo.id}>
                <Card.Body>
                  <Todo
                    index={index}
                    todo={todo}
                    markTodo={markTodo}
                    removeTodo={removeTodo}
                  />
                </Card.Body>
              </Card>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TODO;
