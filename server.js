const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const Usuario = require('./models/Usuario')

app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
  })
)
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'crud_project',
    resave: false,
    saveUninitialized: true,
  })
)

app.post('/cad', (req, res) => {
  let nome = req.body.nome
  let email = req.body.email

  const erros = []

  nome = nome.trim()
  email = email.trim()

  nome = nome.replace(/[^A-zÀ-ú\s]/gi, '')
  nome = nome.trim()

  if (nome === '' || typeof nome === undefined || nome === null) {
    erros.push({ mensagem: 'Campo nome não pode ser vazio!' })
  }

  if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)) {
    erros.push({ mensagem: 'Nome inválido!' })
  }

  if (email === '' || typeof email === undefined || email === null) {
    erros.push({ mensagem: 'Campo e-mail não pode ser vazio!' })
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    erros.push({ mensagem: 'Campo e-mail inválido!' })
  }

  if (erros.length > 0) {
    console.log(erros)
    req.session.errors = erros
    req.session.success = false
    return res.redirect('/')
  }

  Usuario.Usuario.create({
    nome: nome,
    email: email.toLowerCase(),
  })
    .then(() => {
      console.log('Validação realizada com sucesso!')
      req.session.success = true
      return res.redirect('/')
    })
    .catch((error) => {
      console.log('Erro ao realizar cadastro', error)
    })
})

app.get('/', (req, res) => {
  if (req.session.errors) {
    let arrayErros = req.session.errors
    req.session.errors = ''
    return res.render('index', { NavActiveCad: true, error: arrayErros })
  }

  if (req.session.success) {
    req.session.success = false
    return res.render('index', { NavActiveCad: true, MsgSuccess: true })
  }

  res.render('index', { NavActiveCad: true })
})

app.get('/users', (req, res) => {
  Usuario.Usuario.findAll()
    .then((items) => {
      if (items.length > 0) {
        res.render('users', {
          NavActiveUsers: true,
          table: true,
          usuarios: items.map((items) => items.toJSON()),
        })
      }
    })
    .catch((error) => {
      console.log(`Ocorreu um erro: ${error}`)
    })
})

app.post('/editar', (req, res) => {
  let id = req.body.id
  Usuario.Usuario.findByPk(id)
    .then((dados) => {
      return res.render('editar', {
        error: false,
        id: dados.id,
        nome: dados.nome,
        email: dados.email,
      })
    })
    .catch((error) => {
      console.log(error)
      return res.render('editar', {
        error: true,
        problema: 'Não é possível editar registro!',
      })
    })
})

app.post('/atualizar', (req, res) => {
  let nome = req.body.nome
  let email = req.body.email

  const erros = []

  nome = nome.trim()
  email = email.trim()

  nome = nome.replace(/[^A-zÀ-ú\s]/gi, '')
  nome = nome.trim()

  if (nome === '' || typeof nome === undefined || nome === null) {
    erros.push({ mensagem: 'Campo nome não pode ser vazio!' })
  }

  if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)) {
    erros.push({ mensagem: 'Nome inválido!' })
  }

  if (email === '' || typeof email === undefined || email === null) {
    erros.push({ mensagem: 'Campo e-mail não pode ser vazio!' })
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    erros.push({ mensagem: 'Campo e-mail inválido!' })
  }

  if (erros.length > 0) {
    console.log(erros)
    return res.status(400).send({ status: 400, erro: erros })
  }
  Usuario.Usuario.update(
    {
      nome: nome,
      email: email,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => {
      return res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

app.post('/deletar', (req, res) => {
  Usuario.Usuario.destroy({
    where: { 
        id: req.body.id
    }
  })
    .then((callback) => {
      console.log(callback)
      return res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = app 
