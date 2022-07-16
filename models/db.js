const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_crud', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
  logging: false,
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado com sucesso ao banco de dados!')
  })
  .catch((err) => {
    console.log('Conexão com banco de dados falhou!', err)
  })

module.exports = { Sequelize, sequelize }
