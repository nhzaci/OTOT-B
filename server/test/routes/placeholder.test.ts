import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../src/app'
import { todosRepo } from '../../src/routes/placeholder/todo.repo'
import { Todo } from '../../src/routes/placeholder/todo.model'

chai.use(chaiHttp)
chai.should()

const todosSample = [
  {
    id: '1',
    title: 'first',
    description: 'first todo',
  },
  {
    id: '2',
    title: 'second',
    description: 'second todo',
  },
  {
    id: '3',
    title: 'third',
    description: 'third todo',
  },
]

describe('Placeholder', () => {
  beforeEach(() => {
    todosRepo.clear()
    todosSample.forEach(({ id, title, description }) => {
      todosRepo.addTodo(
        {
          title,
          description,
        },
        id
      )
    })
  })

  describe('GET /placeholder', () => {
    it('Should return 200', () => {
      chai
        .request(app)
        .get('/placeholder')
        .end((_, res) => {
          res.should.have.status(200)
          res.body.data.should.eql(todosSample)
        })
    })
  })

  describe('POST /placeholder', () => {
    it('Should return 201', () => {
      chai
        .request(app)
        .post('/placeholder')
        .send({
          title: 'hello world',
          description: 'another world',
        })
        .end((_, res) => {
          res.should.have.status(201)
        })
      chai
        .request(app)
        .get('/placeholder')
        .end((_, res) => {
          res.should.have.status(200)
          res.body.data.should.have.lengthOf(4)
        })
    })
  })

  describe('PUT /placeholder', () => {
    it('Should return 201', () => {
      const title = 'hello world'
      const description = 'another world'
      chai
        .request(app)
        .put('/placeholder/1')
        .send({
          title,
          description,
        })
        .end((_, res) => {
          res.should.have.status(201)
        })
      chai
        .request(app)
        .get('/placeholder')
        .end((_, res) => {
          res.should.have.status(200)
          res.body.data.should.have.lengthOf(3)
          res.body.data
            .filter(
              (todo: Todo) =>
                todo.title === title && todo.description === description
            )
            .should.have.lengthOf(1)
        })
    })
  })

  describe('DELETE /placeholder', () => {
    it('Should return 201', () => {
      chai
        .request(app)
        .delete('/placeholder/1')
        .end((_, res) => {
          res.should.have.status(201)
        })
      chai
        .request(app)
        .get('/placeholder')
        .end((_, res) => {
          res.should.have.status(200)
          res.body.data.should.have.lengthOf(2)
          res.body.data
            .filter((todo: Todo) => todo.id === '1')
            .should.have.lengthOf(0)
        })
    })
  })
})
