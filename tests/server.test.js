const app = require('../server')
const request = require('supertest')
const { listaDatabase, userData } = require('./mocks')

/*describe('Rota de listagem de usuários', () => {
  test('Listando usuários sem filtro', async () => {
    const res = await request(app).get('/users')
    expect(res.body).toEqual(listaDatabase)
  })
})*/

/*describe('Rota de cadastro de usuário', () => {
  test('Cadastro de usuário alterando dados', async () => {
    const newUser = { ...userData }
    newUser.nome = 'Fábio'
    newUser.email = 'fabio@gmail.com'

    const res = await request(app).post('/cad').send(newUser)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(newUser)
  })
})*/
