import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AllSongs from "./components/AllSongs";
import PlaylistPage from "./components/PlaylistPage";
import history from "./components/history";
import Routes from "./components/Routes";

function App() {
  return (
    <Router>
      <div className="container is-max-desktop">
        <div className="notification is-dark has-text-centered">
          <code>Visual Bi Music App</code>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <button
            className="button mt-2 is-success is-outlined"
            onClick={() => history.push(`/`)}
          >
            <span className="icon is-small">
              <i className="fas fa-music"></i>
            </span>
            <span>All Songs</span>
          </button>
          <button
            className="button ml-2 mt-2 is-link is-outlined "
            onClick={() => history.push(`/PlaylistPage/`)}
          >
            <span className="icon is-small">
              <i className="fas fa-list-ul"></i>
            </span>
            <span>Playlists</span>
          </button>
        </div>
        <Routes />
      </div>
    </Router>
  );
}

export default App;
