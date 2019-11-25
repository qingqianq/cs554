import gql from 'graphql-tag';

const GET_RAND_PICS = gql`
  query{
    unsplashImages(pageNum: 5){
      id
      url
      poster_name
      description
    }
  }
`;

const SAVE_PIC_BIN = gql`
    mutation UpdateImage($id: ID!, $url:String, $author: String, $description: String, $user_posted: Boolean, $binned: Boolean){
        updateImage(id:$id, url:$url, author:$author, description:$description, user_posted:$user_posted, binned: $binned){
            id url poster_name description user_posted binned
        }
    }
`;
const GET_BIN_PICS = gql`
    query{
        likedImages{
            id url poster_name description user_posted binned
        }
    }
`;

const SAVE_POST = gql`
    mutation UploadImage($url:String!, $author: String, $description: String){
        uploadImage(url:$url, author:$author, description:$description){
            id url poster_name description user_posted binned
        }
    }
`;

const DEL_POST = gql`
    mutation DeleteImage($id: ID!){
        deleteImage(id:$id){
            id url poster_name description user_posted binned
        }
    }
`;

const GET_POST_PICS = gql`
    query{
        userPostedImages{
            id url poster_name description user_posted binned
        }
    }
`;
const GET_POP_PICS = gql`
    query{
        getTopTenBinnedPosts{
        id
        url
        poster_name
        description
        likes
    }
  }
`;
export default{
    GET_RAND_PICS,
    SAVE_PIC_BIN,
    SAVE_POST,
    GET_BIN_PICS,
    GET_POST_PICS,
    DEL_POST,
    GET_POP_PICS,
};
