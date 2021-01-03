import React, { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import history from "./history";

const PlaylistDetails = ({ playlist }) => {
  const { dispatch } = useContext(PlaylistContext);
  return (
    <>
      <div className="card column mt-5">
        <header className="card-header">
          <p className="card-header-title">Playlist</p>
        </header>
        <div className="card-content">
          <div className="content is-flex is-justify-content-space-between">
            <div>
              <strong>Playlist Name: </strong>
              {playlist.title}
            </div>

            <div>
              <strong>Created At: </strong>
              <time>{playlist.createdAt}</time>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <button
            className="button mt-2 is-success is-rounded is-outlined"
            onClick={() =>
              history.push(`/PlaylistView/${playlist.id}/${playlist.title}`)
            }
          >
            <span>Edit</span>
            <span className="icon is-small">
              <i className="fas fa-edit"></i>
            </span>
          </button>
          <button
            className="button ml-2 mt-2 is-danger is-rounded is-outlined "
            onClick={() =>
              dispatch({ type: "REMOVE_PLAYLIST", id: playlist.id })
            }
          >
            <span>Delete</span>
            <span className="icon is-small">
              <i className="fas fa-trash"></i>
            </span>
          </button>
        </footer>
      </div>
    </>
  );
};

export default PlaylistDetails;
