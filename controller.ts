import { IUser } from './types.ts';

let users: Array<IUser> = [{
  id: "1",
  name: "Batman",
  email: "ilikecaves@hotmail.com",
},{
  id: "2",
  name: "Thor",
  email: "hammers4lyfe@icloud.com",
},{
  id: "3",
  name: "The Hulk",
  email: "smash_things@gmail.com",
}]

const searchUserById = (id: string): ( IUser | undefined ) => users.filter(user => user.id === id )[0]

export const getUsers = ({ response }: { response: any }) => { 
  response.body = users 
}
  
export const getUser = ({ params, response }: { params: { id: string }; response: any }) => {
  const user: IUser | undefined = searchUserById(params.id)
  if (user) {
    response.status = 200
    response.body = user
  } else {
    response.status = 404
    response.body = { message: `user not found.` }
  }   
}

export const addUser = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body()
  const user: IUser = body.value  
  users.push(user)
  response.body = { message: 'OK' }
  response.status = 200
}


export const updateUser = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
  let user: IUser | undefined = searchUserById(params.id)
  if (user) {
    const body = await request.body()
    const updateInfos: { name?: string; email?: string } = body.value
    user = { ...user, ...updateInfos}
    users = [...users.filter(user => user.id !== params.id), user]
    response.status = 200
    response.body = { message: 'OK' }
  } else {
    response.status = 404
    response.body = { message: `user not found` }
  }  
}

export const deleteUser = ({ params, response }: { params: { id: string }; response: any }) => {
  users = users.filter(user => user.id !== params.id)
  response.body = { message: 'OK' }
  response.status = 200
}


export const getPokemon = async({ params, response }: { params: { name: string }; response: any }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemon = await res.json()
  if(pokemon){
    response.status = 200
    response.body = {pokemon}
  }else{
    response.status = 404
    response.body = {message: "No pokemon found"}
  }
}
  
  
  
  
  