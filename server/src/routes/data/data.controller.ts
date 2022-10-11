import axios from 'axios'
import { Controller, Get, Path, Route, Tags } from 'tsoa'
import { redisClient } from '../../middleware/redis'
import { DataFailure, DataSuccess } from './data.model'
import { performance } from 'perf_hooks'

@Route('data')
@Tags('Data')
export class DataController extends Controller {
  static readonly ENDPOINT = 'https://jsonplaceholder.typicode.com/posts'
  static readonly TODOS_KEY_PREFIX = 'todos:'
  static readonly TODOS_ALL_KEY = 'todos:all'

  constructor() {
    super()
  }

  makeResult(startTime: number, fromCache: boolean, data: any): DataSuccess {
    return {
      success: true,
      time: performance.now() - startTime,
      fromCache,
      data,
    }
  }

  @Get()
  async getData(): Promise<DataSuccess | DataFailure> {
    const timeStart = performance.now()
    try {
      const cachedResults = await redisClient.get(DataController.TODOS_ALL_KEY)
      if (cachedResults !== null) {
        return this.makeResult(timeStart, true, JSON.parse(cachedResults))
      }

      const { data } = await axios.get(DataController.ENDPOINT)
      // NX: don't allow sets when key exists
      // EX: cache validity in seconds (evict cache after x seconds)
      await redisClient.set(
        DataController.TODOS_ALL_KEY,
        JSON.stringify(data),
        {
          NX: true,
          EX: 180,
        }
      )

      return this.makeResult(timeStart, false, data)
    } catch (e) {
      this.setStatus(500)
      return {
        success: false,
        message: `${e}`,
      }
    }
  }

  @Get('{todoId}')
  async getById(@Path() todoId: string) {
    const timeStart = performance.now()
    const redisKey = `${DataController.TODOS_KEY_PREFIX}${todoId}`
    try {
      const cachedResults = await redisClient.get(redisKey)
      if (cachedResults !== null) {
        return this.makeResult(timeStart, true, JSON.parse(cachedResults))
      }

      const { data } = await axios.get(`${DataController.ENDPOINT}/${todoId}`)
      // NX: don't allow sets when key exists
      // EX: cache validity in seconds (evict cache after x seconds)
      await redisClient.set(redisKey, JSON.stringify(data), {
        NX: true,
        EX: 180,
      })

      return this.makeResult(timeStart, false, data)
    } catch (e) {
      this.setStatus(500)
      return {
        success: false,
        message: `${e}`,
      }
    }
  }
}
