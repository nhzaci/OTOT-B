export type Todo = {
  id: string
} & TodoBody

export type TodoBody = {
  title: string
  description: string
}

export type UpdateTodoBody = {
  id: string
  todo: TodoBody
}
