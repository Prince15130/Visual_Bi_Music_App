import React, { useContext, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

export const CreatePlaylist = (props) => {
  const [title, setTitle] = useState("");
  const { dispatch } = useContext(PlaylistContext);
  const { close } = props;

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_PLAYLIST", playlist: { title } });
    close();
  };
  return (
    <div className="modal is-active" id="add-a-playlist">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create a Playlist</p>
          <button
            className="delete close-modal-button"
            aria-label="close"
            onClick={props.close}
          ></button>
        </header>
        <section className="modal-card-body">
          <textarea
            className="textarea"
            placeholder="Please Provide Playlist Name"
            onChange={(e) => setTitle(e.target.value)}
            required
          ></textarea>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success add-playlist"
            onClick={(e) => handelSubmit(e)}
          >
            Save Changes
          </button>
          <button className="button close-modal-button" onClick={close}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
