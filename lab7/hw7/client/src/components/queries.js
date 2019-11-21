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
const GET_BIN_PICS_ID = gql`
    query{
        likedImages{
            id
        }
    }
`;
const SAVE_POST = gql`
    mutation UploadImage($url:String!, $description:String, $author:String){
        uploadImage(url:$url, description:$description, author:$author){
            id url poster_name description user_posted binned
        }
    }
`;
export default{
    GET_RAND_PICS,
    GET_BIN_PICS,
    GET_BIN_PICS_ID,
    SAVE_PIC_BIN,
    SAVE_POST,
};
