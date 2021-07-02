import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './components/landing/landing';
import Meeting from "./components/createRoom/createRoom";
import Room from "./components/room/room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/create" exact component={Meeting} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;