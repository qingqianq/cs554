const {ApolloServer, gql} = require("apollo-server");
const Service = require('./service.js');


const typeDefs =
      gql`
      input ImageInput{
          id: ID!
          url: String!
          poster_name: String!
          description: String
          user_posted: Boolean!
          binned: Boolean!
      }
      type Query{
          unsplashImages(pageNum: Int!): [ImagePost]
          likedImages: [ImagePost]
          userPostedImages: [ImagePost]
      }
      type Mutation{
          uploadImage(url: String!, description: String, author: String): ImagePost
          updateImage(id: ID!, url: String, description: String, binned: Boolean): ImagePost
          deleteImage(id: ID!): ImagePost
          saveImage(input: ImageInput): ImagePost
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
        // saveImage:async(_,args) => await Service.saveImage(args.input), //input here
        saveImage:(_,args) => Service.saveImage(args.input), //input here

    },
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
