const express = require('express');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let todos = [];
app.get("/todos", (req, res) => {
    res.render("index", { todos });
});
app.get("/todos/new", (req, res) => {
    res.render("new");
});
app.post("/todos", (req, res) => {
    const { task } = req.body;
    todos.push({ task, id: uuid(), done: false });
    res.redirect("/todos");
});
app.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    res.render("show", { todo });
});
app.get("/todos/:id/edit", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    res.render("edit", { todo });
});
app.patch("/todos/:id/done", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    todo.done = !todo.done;
    res.redirect("/todos");
});
app.patch("/todos/:id", (req, res) => {
    const { id } = req.params;
    const newTask = req.body.task;
    const checked = req.body.done;
    console.log(checked);
    const todo = todos.find(t => t.id === id);
    todo.task = newTask;
    res.redirect("/todos");
});
app.patch("/todos/:id/checked", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    const checked = req.body.done;
    checked === "on" ? todo.done = true : todo.done = false;
    res.redirect("/todos");
});
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id !== id);
    res.redirect("/todos");
});

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});