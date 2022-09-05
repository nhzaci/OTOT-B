import {
  Post,
  Put,
  Controller,
  Delete,
  Get,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa'

@Route('placeholder')
@Tags('placeholder')
export class PlaceholderController extends Controller {
  constructor() {
    super()
  }

  @Get()
  public get() {
    this.setStatus(200)
    return {
      success: true,
    }
  }

  @Delete()
  public delete() {
    this.setStatus(201)
    return {
      success: true,
    }
  }

  @Post()
  public post() {
    this.setStatus(201)
    return {
      success: true,
    }
  }

  @Put()
  public put() {
    this.setStatus(201)
    return {
      success: true,
    }
  }
}
