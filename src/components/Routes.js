import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { PlaylistView } from "./PlaylistView";
import { AddSong } from "./AddSong";
import PlaylistPage from "./PlaylistPage";
import AllSongs from "./AllSongs";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={AllSongs} />
          <Route path="/PlaylistPage" exact component={PlaylistPage} />
          <Route
            exact
            path="/PlaylistView/:playlistId/:playlistName"
            component={PlaylistView}
          />
          <Route
            exact
            path="/AddSong/:playlistId/:playlistName"
            component={AllSongs}
          />
        </Switch>
      </Router>
    );
  }
}
