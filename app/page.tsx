"use client"

import { useState } from "react";

type Todo = {
    id: number;
    title: string;
    description: string;
};

type NewTodo = Omit<Todo, "id">;


export default function Home() {
    return (
        <>
            <main>
                <h1>Welcome to TodoApp</h1>
                <div>
                    <Todos />
                </div>
            </main>
        </>
    );
}

function Todos() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Dishwasher", description: "empty the dishes from the dishwasher" },
        { id: 2, title: "Washing machine", description: "empty the wash from the washing machine" },
    ]);

    function addTodo(newTodo: NewTodo) {
        setTodos((prev) => [
            ...prev,
            {id: Date.now(),  ...newTodo}
        ])
    }

    return (
        <>
            {todos.map((todo) => {
                return (
                    <div key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                    </div>
                )
            })}
            <AddTodoForm addTodo={addTodo} />
        </>
    );
}

function AddTodoForm({ addTodo }: { addTodo: (todo: NewTodo) => void }) {
    const [description, setDesc] = useState("")
    const [title, setTitle] = useState("")

    return (
        <div>
            <input type="text" placeholder="Title..." value={title} onChange={e => setTitle(e.target.value)}/>
            <input type="text" placeholder="Description..." value={description} onChange={e => setDesc(e.target.value)}/>
            <button onClick={() => {
                if (title != "" && description != "") {
                    addTodo({
                        title,
                        description
                    })
                    setDesc("")
                    setTitle("")
                }
            }}>Add todo</button>
        </div>
    )
}
