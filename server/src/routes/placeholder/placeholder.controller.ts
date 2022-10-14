import {
  Post,
  Put,
  Controller,
  Delete,
  Get,
  Route,
  Tags,
  Body,
  Path,
} from 'tsoa'
import { Failure, Success } from '../../shared/shared.model'
import { MutateTodoSuccess, GetTodosResponse } from './placeholder.model'
import { TodoBody } from './todo.model'
import { todosRepo, TodosRepo } from './todo.repo'

@Route('placeholder')
@Tags('placeholder')
export class PlaceholderController extends Controller {
  private todosRepo: TodosRepo

  constructor() {
    super()
    this.todosRepo = todosRepo
  }

  @Get()
  public get(): GetTodosResponse {
    this.setStatus(200)
    return {
      success: true,
      data: this.todosRepo.getTodos(),
    }
  }

  @Delete('{id}')
  public delete(@Path() id: string): Failure | MutateTodoSuccess {
    try {
      const deletedTodo = this.todosRepo.removeTodoById(id)
      this.setStatus(201)
      return {
        success: true,
        data: {
          ...deletedTodo,
          id,
        },
      }
    } catch (e) {
      this.setStatus(400)
      return {
        success: false,
        message: `Error in deleting todo: ${e}`,
      }
    }
  }

  @Post()
  public post(@Body() todo: TodoBody): Success {
    this.todosRepo.addTodo(todo)
    this.setStatus(201)
    return {
      success: true,
    }
  }

  @Put('{id}')
  public put(
    @Path() id: string,
    @Body() todo: TodoBody
  ): Failure | MutateTodoSuccess {
    try {
      this.todosRepo.updateTodoById(id, todo)
      this.setStatus(201)
      return {
        success: true,
        data: {
          ...todo,
          id,
        },
      }
    } catch (e) {
      this.setStatus(400)
      return {
        success: false,
        message: `Error updating todo: ${e}`,
      }
    }
  }
}
