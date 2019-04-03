import sequelizeCache from '../../src'
import { Sequelize, Options, DataTypes } from 'sequelize'

const VariableAdaptor = require('../../../sequelize-transparent-cache-variable')
const variableAdaptor = new VariableAdaptor()
const { withCache } = sequelizeCache(variableAdaptor)


const options: Options = {
  logging: false,
  dialect: 'sqlite',
  define: {
    paranoid: true
  }
}

export const sequelize = new Sequelize(options)

export const User = withCache(sequelize.define('User', {
  name: {
    allowNull: false,
    type: DataTypes.STRING
  }
}))

export const Article = withCache(sequelize.define('Article', {
  uuid: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  }
}))

export const Comment = withCache(sequelize.define('Comment', {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  articleUuid: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true
  },
  body: {
    allowNull: false,
    type: DataTypes.STRING
  }
}))


User.hasMany(Article, { as: 'Articles' })
Article.belongsTo(User, { as: 'User' })
