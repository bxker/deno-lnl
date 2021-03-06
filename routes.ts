import { Router }from 'https://deno.land/x/oak/mod.ts'
import { getUsers
      , getUser
      , getPokemon
      , addUser
      , updateUser
      , deleteUser } from './controller.ts'

const router = new Router()
router.get('/users', getUsers)
      .get('/users/:id', getUser)
      .get( '/pokemon/:name', getPokemon)
      .post('/users', addUser)
      .put('/users/:id', updateUser)
      .delete('/users/:id', deleteUser)

export default router
