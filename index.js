const buildClassMethods = require('./lib/methods/class')
const buildInstanceMethods = require('./lib/methods/instance')

module.exports = client => ({
  withCache (modelClass) {
    modelClass.cache = function () {
      return buildClassMethods.auto(client, this)
    }

    modelClass.manualCache = function (customId) {
      return buildClassMethods.manual(client, this, customId)
    }

    modelClass.prototype.cache = function () {
      return buildInstanceMethods(client, this)
    }

    return modelClass
  }
})
