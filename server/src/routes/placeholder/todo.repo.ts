import { v4 } from 'uuid'
import { Logger } from '../../utils/logger'
import { TodoBody, Todo } from './todo.model'

export class TodosRepo {
  private todos: Map<string, TodoBody>

  constructor() {
    this.todos = new Map<string, TodoBody>()
  }

  clear(): void {
    this.todos.clear()
  }

  addTodo(todo: TodoBody, id: string = v4()): void {
    this.todos.set(id, todo)

    Logger.info(`Added new todo, new todos length: ${this.todos.size}`, todo)
  }

  removeTodoById(id: string): TodoBody {
    this.checkIfIdExistsOrThrow(id)

    const deletedTodo = this.todos.get(id)

    if (deletedTodo === undefined) {
      Logger.error(`id does not exist in todos repo`, id, deletedTodo)
      throw Error('todo is undefined')
    }

    this.todos.delete(id)

    Logger.info(`Successfully removed todo: `, deletedTodo)

    return deletedTodo
  }

  updateTodoById(id: string, newTodo: TodoBody): void {
    this.checkIfIdExistsOrThrow(id)

    this.todos.set(id, { ...newTodo })

    Logger.info(`Updated todo with id: ${id}`, newTodo)
  }

  private checkIfIdExistsOrThrow(id: string) {
    if (!this.todos.has(id)) {
      Logger.error(`id does not exist in todos repo`, id)
      throw Error('id does not exist in repository')
    }
  }

  getTodos(): Todo[] {
    Logger.info(`Get todos of size: ${this.todos.size}`)
    return Array.from(this.todos.entries()).map(([id, value]) => {
      return {
        ...value,
        id,
      }
    })
  }
}

export const todosRepo = new TodosRepo()
