import React, { useContext } from "react";
import history from "./history";
import { PlaylistContext } from "../context/PlaylistContext";

export const PlaylistView = ({ match, location }) => {
  const {
    params: { playlistId, playlistName },
  } = match;
  const { musicState } = useContext(PlaylistContext);
  const { playlist, allsongs } = musicState;
  const { dispatch } = useContext(PlaylistContext);

  const filterdPlaylist = playlist.filter((list) => list.id === playlistId)[0];

  const playlistSongs =
    filterdPlaylist.songs.length > 0
      ? filterdPlaylist.songs.map((filterSong) => {
          return allsongs.find((songs) => songs.id === filterSong);
        })
      : [];

  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        <strong>PlayList: {playlistName}</strong>
        <div className="field is-grouped is-grouped-right">
          <button
            className="button is-primary is-outlined"
            onClick={() =>
              dispatch({
                type: "SHUFFLE_SONG",
                id: playlistId,
              })
            }
          >
            <span className="icon">
              <i className="fas fa-random"></i>
            </span>
            <span>Shuffle Songs</span>
          </button>
          <button
            className="button is-link is-outlined ml-2"
            onClick={() =>
              history.push(`/AddSong/${playlistId}/${playlistName}`)
            }
          >
            <span className="icon">
              <i className="fas fa-plus-circle"></i>
            </span>
            <span>Add Songs</span>
          </button>
        </div>
      </div>
      <div className="column is-multiline mt-3">
        {playlistSongs.map((list) => {
          return (
            <div className="card mt-5 is-flex is-justify-content-space-between">
              <div className="card-content">
                <p className="title is-4">Song Title</p>
                <div className="content subtitle" key={list.id}>
                  {list.title}
                </div>
              </div>
              <button
                className="button mt-5 mr-3 is-danger is-outlined"
                onClick={() =>
                  dispatch({
                    type: "DELETE_SONG_PLAYLIST",
                    id: playlistId,
                    songs: list.id,
                  })
                }
              >
                <span className="icon">
                  <i className="fas fa-trash"></i>
                </span>
                <span>Delete Song</span>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
