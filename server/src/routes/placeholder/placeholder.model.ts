import { Todo } from './todo.model'

export type GetTodosResponse = {
  success: true
  data: Todo[]
}

export type MutateTodoSuccess = {
  success: true
  data: Todo
}
