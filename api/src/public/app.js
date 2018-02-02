const todoInput = $(".todo-input");

$(function() {
  $.getJSON("/api/todos")
    .done(addTodos)
    .fail(err => console.error(err));

  todoInput.change(event => {
    const name = event.target.value;
    $.post("/api/todos", { name })
      .done(addTodo)
      .fail(err => console.error(err));
  });
});

function addTodos(todos) {
  /** type Todo = {
        completed : false
        created_date : "2018-02-02T21:23:04.812Z"
        name : "hello world"
        __v : 0
        _id : "5a74d6b80193960179f35209
      }
  */
  todos.forEach(addTodo);
}

function addTodo({ name, _id, completed, created_date }) {
  const deleteIcon = $("<span />").text("X");
  const url = `/api/todos/${_id}`;
  const item = $("<li />")
    .text(name)
    .addClass("task")
    .data("id", _id)
    .append(deleteIcon);

  if (completed) item.addClass("done");

  item.click(e => {
    e.preventDefault();
    $.ajax({
      url,
      data: {
        completed: !item.hasClass("done"),
      },
      method: "PUT",
    })
      .done(todo => {
        if (todo.completed) item.addClass("done");
        else item.removeClass("done");
      })
      .fail(err => console.error(err));
  });

  deleteIcon.click(e => {
    e.preventDefault();
    e.stopPropagation();
    const yes = confirm("Do you really want to delete this item?");

    if (yes) {
      $.ajax({
        url,
        method: "DELETE",
      })
        .done(todo => {
          item.remove();
        })
        .fail(err => console.error(err));
    }
  });
  $(".list").append(item);
  todoInput.val("");
}
