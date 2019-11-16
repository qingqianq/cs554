const {ApolloServer, gql} = require("apollo-server");
const Service = require('./service.js');


const typeDefs =
      gql`
      type Query{
          unsplashImages(pageNum: Int!): [ImagePost]
          likedImages: [ImagePost]
          userPostedImages: [ImagePost]
          getImages: [ImagePost]
      }
      type Mutation{
          uploadImage(url: String!, description: String, author: String): ImagePost
          updateImage(id: ID!, url: String, description: String, binned: Boolean): ImagePost
          deleteImage(id: ID!): ImagePost
          saveImage(id:String!, url:String!, poster_name:String!, description: String, user_posted:Boolean!, binned: Boolean!): ImagePost
      }
      type ImagePost {
          id: ID!
          url: String!
          poster_name: String!
          description: String
          user_posted: Boolean!
          binned: Boolean!
      }
`;

const resolvers = {
    Query: {
        unsplashImages: (_,args) => Service.getUnsplashPics(args.pageNum),
        likedImages:(_,args) => null,
        userPostedImages: (_,args) => null
    },
    Mutation:{
        updateImage:(_, args) =>{
            return null;
        },
        uploadImage:(_, args) =>{
            return null;
        },
        deleteImage:(_, args) =>{
            return null;
        },
        // saveImage:(_,args) => Service.saveImage(args),
        saveImage:(_,args) => {
            console.log(args);
            return null;
        },
    } 
};
const server = new ApolloServer({ typeDefs, resolvers});
(async()=>{
    try{
        const {url} = await server.listen();
        console.log(`Server ready at ${url}`);
    }catch(e){
        console.log(e);
    }
})();
