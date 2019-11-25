import React from 'react';
import queries from './queries.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
function Image(props) {
    let image = props.image;
    let user_posted = props.user_posted;
    let addToBin = true;
    const [updateImage] = useMutation(queries.SAVE_PIC_BIN,{
        refetchQueries: [{query:queries.GET_BIN_PICS}],
    });
    const {loading,error,data} = useQuery(queries.GET_BIN_PICS);
    if(loading || error)
        return null;
    else{
        let {likedImages} = data;
        for(let img of likedImages){
            if(image.id === img.id){
                addToBin = false;
                break;
            }
        }
    }
    let info = addToBin ? "Add to Bin" : "Remove from Bin";
    return (
        <div>
          <form
            onSubmit={e => {
                e.preventDefault();
                updateImage({
                    variables:{
                        id:image.id,
                        url:image.url,
                        author:image.poster_name,
                        description:image.description,
                        user_posted:user_posted,
                        binned:addToBin,
                    }
                });
                if(addToBin)
                    alert("saved");
                else
                    alert("removed");
            }}
            >
            <button className="btn btn-primary" type="submit" >{info}</button>
          </form>
        </div>
    );
}

export default Image;
