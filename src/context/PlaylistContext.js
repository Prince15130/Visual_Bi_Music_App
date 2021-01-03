import React, { createContext, useReducer, useEffect } from "react";
import { playlistReducer } from "../reducer/playlistReducer";

export const PlaylistContext = createContext();

const PlaylistContextProvider = (props) => {
  /* const [playlists, dispatch] = useReducer(playlistReducer, [], () => {
    const localData = localStorage.getItem("playlists");
    return localData ? JSON.parse(localData) : [];
  }); */
  const [musicState, dispatch] = useReducer(
    playlistReducer,
    {
      playlist: [],
      allsongs: [],
    },
    () => {
      const localData = localStorage.getItem("musicState");
      return localData ? JSON.parse(localData) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("musicState", JSON.stringify(musicState));
  }, [musicState]);

  return (
    <PlaylistContext.Provider value={{ musicState, dispatch }}>
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
