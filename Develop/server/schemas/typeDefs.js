const { gql } = require('apollo-server-express');
const typeDefs = gql`
//info from the model

type Book {
    _id:ID!
    bookId: String
    authors: [String]
    descrtiption: String
    title: String
    image: String
    link: String
}

type User{
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}


module.exports = typeDefs;