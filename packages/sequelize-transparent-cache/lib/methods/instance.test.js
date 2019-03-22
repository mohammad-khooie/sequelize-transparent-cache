const sequelize = require('../../test/helpers/sequelize')

const User = sequelize.models.User
const cacheStore = User.cache().client().store

beforeAll(() => sequelize.sync())

describe('Instance methods', () => {

  expect(cacheStore).toEqual({}, 'Cache is empty on start')

  const user = User.build({
    id: 1,
    name: 'Daniel'
  })

  test('Create', async () => {
    await user.cache().save()

    expect(cacheStore.User[1]).toEqual(
      user.get(),
      'User cached after create'
    )

    expect((await User.cache().findByPk(1)).get()).toEqual(
      user.get(),
      'Cached user correctly loaded'
    )
  })

  test('Update', async () => {
    await user.cache().update({
      name: 'Dmitry'
    })

    expect(user.name).toBe('Dmitry', 'User name was updated')

    expect(cacheStore.User[1]).toEqual(
      user.get(),
      'User cached after upsert'
    )
  })

  test('Clear', async () => {
    expect((await User.cache().findByPk(1)).get()).toEqual(
      user.get(),
      'Cached user correctly loaded'
    )
    await user.cache().clear()

    expect(cacheStore.User[1]).toBeUndefined()
  })

  test('Destroy', async () => {
    await user.cache().destroy()

    expect(cacheStore.User[1]).toBeUndefined()
    expect(await User.findByPk(1)).toBeNull()
  })
})
