import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
const query = gql`query {
  getBooks{
    title
    #author
  }
}`;

const getData = ()=>(
    <Query query={query}>
      {({ data }) =>{
          if(!data)
              return null;
          return(
              <div>
                {data.getBooks.map(book=> (
                    <div>
                      {book.title}
                    </div>
                ))}
              </div>
          );
      }}
    </Query>
);
class Data extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

    }
    componentDidUpdate(PrevProps){

    }
    render(){
        let a = getData();
        return(
            <div>
              hello
              {a}
              {/*
                  <Query query={query} fetchPolicy={"cache-and-network"}>
                        {({data}) =>{
                            const {getBooks} = data;
                            if(!getBooks)
                            return null;
                            return (
                            <div>
                              {getBooks}
                            </div>
                            );
                            }}
                            </Query>
               */}
            </div>

        );
    }}
export default Data;
