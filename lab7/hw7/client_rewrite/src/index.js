import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
const BASE_URL = "http://localhost:4000";
const httpLink = new HttpLink({
    uri: BASE_URL,
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    }
});
const cache = new InMemoryCache();

//Finally, you can use both instantiated configurations, the link and the cache, to create the instance of the Apollo Client
const client = new ApolloClient({
    link: httpLink,
    cache
});

const config = (
    <ApolloProvider client={client}>
      <App client={client}/>
    </ApolloProvider>
);
if (module.hot) {
    module.hot.accept();
}
ReactDOM.render(config, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
