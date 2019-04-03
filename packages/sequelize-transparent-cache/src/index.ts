import * as buildClassMethods from './methods/class'
import { buildInstanceMethods } from './methods/instance'
import { Model } from 'sequelize'

interface WithCache {
  cache(string?): any
}

const build = client => ({
  withCache(modelClass: typeof Model): typeof Model & WithCache {
    const withCache = {
      cache(customId) {
        return customId
          ? buildClassMethods.manual(client, this, customId)
          : buildClassMethods.auto(client, this)
      }
    }

    // modelClass.prototype.cache = function () {
    //   return buildInstanceMethods(client, this)
    // }

    return Object.assign(modelClass, withCache)
  }
})

export default build