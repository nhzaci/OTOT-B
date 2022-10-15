import { model, Schema, Model } from 'mongoose'

const todoSchema: Schema = new Schema({
  _id: String,
  title: String,
  body: String,
  userId: String,
})

export type TodoDocument = {
  _id: string
  title: string
  body: string
  userId: string
} & Document

export const todos: Model<TodoDocument> = model('todos', todoSchema)
