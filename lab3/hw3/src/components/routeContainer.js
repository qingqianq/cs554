import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PokemonList from "./pokemon/PokemonList.js";
import Pokemon from "./pokemon/Pokemon.js";
import BerryList from "./berry/BerryList.js";
import Berry from "./berry/Berry.js";
import MachineList from "./machine/MachineList.js";
import Machine from "./machine/Machine.js";
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
  const PokemonRouter = () =>(
    <Switch>
      <Route path="/pokemon/page/:page(\d+)"  exact component={PokemonList} />
      <Route path="/pokemon/:id(\d+)" exact component={Pokemon} />
      <Redirect to="/nowhere"/>
    </Switch>
  );
  const BerryRouter = () =>(
    <Switch>
      <Route exact path="/berries/page/:page(\d+)" component={BerryList} />
      <Route exact path="/berries/:id(\d+)" component={Berry} />
      <Redirect to="/nowhere" />
    </Switch>

  );
  const MachineRouter = () => (
    <Switch>
      <Route exact path="/machines/page/:page(\d+)" component={MachineList} />
      <Route exact path="/machines/:id(\d+)" component={Machine} />
      <Redirect to="/nowhere" />
    </Switch>
  );
  return(
    <div>
      <Switch>
        <Route path="/pokemon" component={PokemonRouter} />
        <Route path="/berries" component={BerryRouter} />
        <Route path="/machines" component={MachineRouter} />
        <Route path="/(.+)" component={Nowhere} />
      </Switch>
    </div>
  );
}
export default routeContainer;
