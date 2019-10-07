import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PokemonList from "./pokemon/PokemonList.js";
import Pokemon from "./pokemon/Pokemon.js";
/*
  pokeapi.co/api/v2/pokemon/?offset=-90&limit=10
  return nothing in results, but the offset = -90 it returns the pokemons...
  That makes my /pokemon/page/-100 has a bug.
  Router with regular expression (\d) to number
  use (.+) match all not empty string.
*/
function routeContainer(){
    let Nowhere = ()=>{
        return(<div>404 Nowhere</div>);
    };
    let PokemonRouter = () =>(
        <div>
          <Switch>
            <Route path="/pokemon/page/:page(\d+)" exact component={PokemonList} />
            <Route path="/pokemon/:id(\d+)" exact component={Pokemon} />
            <Redirect to="/nowhere"/>
          </Switch>
        </div>
    );
    return(
        <div>
          <Switch>
            <Route path="/pokemon" component={PokemonRouter} />
            {/*
                <Route path="/berries/page/:page" exact component={berries} />
                    <Route path="/machine/page/:page" exact component{machine} />
                    */}
                    <Route path="/(.+)" component={Nowhere} />
          </Switch>
        </div>
    );
}
export default routeContainer;
