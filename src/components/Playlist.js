import React, { useContext, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { CreatePlaylist } from "./CreatePlaylist";
import PlaylistDetails from "./PlaylistDetails";

const Playlist = () => {
  const { musicState } = useContext(PlaylistContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { playlist } = musicState;

  const handleModal = (flag) => {
    if (flag === true) {
      setOpenConfirm(true);
    } else {
      setOpenConfirm(false);
    }
  };
  console.log(musicState);
  return playlist.length ? (
    <>
      <div className="column is-multiline mt-5 ml-5">
        <ul>
          {playlist.map((list) => {
            return <PlaylistDetails playlist={list} key={list.id} />;
          })}
        </ul>
      </div>
      <button
        className="button is-link is-outlined open-modal-button"
        onClick={() => handleModal(true)}
      >
        <span className="icon">
          <i className="fas fa-music"></i>
        </span>
        <span>Create Playlist</span>
      </button>
      {openConfirm && <CreatePlaylist close={() => handleModal(false)} />}
    </>
  ) : (
    <>
      <div className="content">No Playlists. Please create a Playlist</div>
      <button
        className="button is-link is-outlined open-modal-button"
        onClick={() => handleModal(true)}
      >
        <span className="icon">
          <i className="fas fa-music"></i>
        </span>
        <span>Create Playlist</span>
      </button>
      {openConfirm && <CreatePlaylist close={() => handleModal(false)} />}
    </>
  );
};

export default Playlist;
