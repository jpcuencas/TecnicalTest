import { makeExecutableSchema } from 'graphql-tools';
import {resolvers} from './resolvers';
// graphql definition (name requerido)
// query (opcion por defecto) consulta
/*
{
  hello
  test1
  hi(name:"Juan")
  greet(name:"Juan")
  task {
      _id
      title
      description
      number
  }
  users {
      _id
      firstname
      lastname
      age
    }
}
*/

// mutation modificar los objetos
/*
mutation {
    createTask(input: {
      title: "Task one"
      description: "Description one"
      number: 400
    }) {
      _id
      title
      description
      number
    }
  }
   createUser(input: {
      firstname: "Juan"
      lastname: "Cuenca"
      age: 33
    }) {
      _id
      firstname
      lastname
      age
    }
    deleteUser(_id: "60aa9ec7e386e743c078d76e")
    {
      _id
      firstname
    }
    updateUser(_id: "60aa9ebee386e743c078d76d",
    input: {
        firstname: "Jose"
        lastname: "Sevilla"
    }) {
        _id
        firstname
        lastname
        age
    }
  }

*/
// esquema de lo que podemos devolver
// 1.- (query)consulta
// 2.- (type)tipos definidos
// 3.- (mutation)cambios en el servidor
const typeDefs = `
    type Query {
        hello: String
        greet(name: String!): String
        hi(name: String!): String
        test1: Int
        asserts: [Asset]
        users: [User]
    }

    type Asset {
        _id: ID
        title: String!
        description: String!
        number: Int
    }
    type User {
        _id: ID
        firstname: String!
        lastname: String
        age: Int
    }

    type Mutation {
        createTask(input:TaskInput): Task
        createUser(input:UserInput): User
        deleteUser(_id: ID): User
        updateUser(_id: ID, input: UserInput): User
    }

    input TaskInput {
        title: String!
        description: String!
        number: Int
    }
    input UserInput {
        firstname: String!
        lastname: String
        age: Int
    }
    `;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});