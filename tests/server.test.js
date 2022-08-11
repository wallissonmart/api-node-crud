const app = require('../server')
const request = require('supertest')

const usuario = [
  {
    nome: 'Bruno',
    email: 'bruno@gmail.com',
  },
  {
    nome: 'Enzo',
    email: 'enzo@gmail.com',
  },
]

test('Deve ser possível adicionar um novo usuário', async () => {
  const response = await request(app).post('/cad').send(usuario[0])

  expect(response.ok).toBeTruthy()
})

test('Deve ser possível listar todos os usuários', async () => {
  const response = await request(app).post('/cad').send(usuario[0])

  const responseGet = await request(app).get('/users')

  expect(responseGet.body).toHaveLength(1)
})
