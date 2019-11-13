const {ApolloServer, gql} = require('apollo-server');
/*
  The tpye of resolvers is a map of typeDefs  the resolvers may be less than the typeDefs,
  for example, typeDefs define a query employee, but the resolvers may not implement it and returns null
  but if the resolvers has something typeDefs do not have, it will lead compile err.
  @include(if: Boolean)，如果参数的值是 true 才会在查询结果中包含字段。
  @skip(if: Boolean)，参数的值如果是 true，忽略这个字段。

  query examples https://ninghao.net/blog/5630
*/


const typeDefs = gql`
    type Book{
        title: String
        author: String
    }
    type Author{
        name: String
        books:[Book]
    }
#    type Query{
#       books:[Book]
#  }
type Query {
  getBooks: [Book]
  getAuthors: [Author]
}
`;
const books = [
    {
        title : 'Harry Potter',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];
const authors = [{
    name:"Faker"
}];
const resolvers = {
    Query: {
        // books: ()=>books,
        getBooks: ()=>books,
        getAuthors: ()=>authors
    }
};
const server = new ApolloServer({typeDefs, resolvers});
// server.listen().then(({url}) =>{
//   console.log(` Server ready at ${url}`);
// });
(async()=>{
    try{
        const {url} = await server.listen();
        console.log(`Server ready at ${url}`);
    }catch(e){
        console.log(e);
    }
})();
