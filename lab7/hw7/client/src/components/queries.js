import gql from 'graphql-tag';

const GET_RAND_PICS = gql`
query{
    unsplashImages(pageNum: 5){
        id
        url
        poster_name
        description
        user_posted
        binned
    }
}
`;
const SAVE_PIC_STRING =  `mutation SaveImage($input: ImageInput){
    saveImage(input:$input){
        id url poster_name description user_posted binned
    }}`;
export default{
    GET_RAND_PICS,
    SAVE_PIC_STRING
};
