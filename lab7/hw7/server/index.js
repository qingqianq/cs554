const {ApolloServer, gql} = require("apollo-server");
const Service = require('./service.js');


const typeDefs =
      gql`
      type Query{
          unsplashImages(pageNum: Int!): [ImagePost]
          likedImages: [ImagePost]
          userPostedImages: [ImagePost]
      }
      type Mutation{
          uploadImage(url: String!, description: String, author: String): ImagePost
          updateImage(id:ID!, url: String, author: String, description: String, user_posted: Boolean, binned: Boolean):ImagePost
          deleteImage(id: ID!): ImagePost
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
        likedImages:() => Service.likedImages(),
        userPostedImages: () => Service.userPostedImages(),
    },
    Mutation:{
        updateImage:(_, args) => Service.updateImage(args.id, args.url, args.author, args.description, args.user_posted, args.binned),
        uploadImage:(_, args) => Service.uploadImage(args.url, args.description, args.author),
        deleteImage:(_, args) => Service.deleteImage(args.id),
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
