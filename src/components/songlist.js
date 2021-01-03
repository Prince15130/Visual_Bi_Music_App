import React, { useState, useEffect, useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

import axios from "axios";

const Songlist = ({
  title,
  id,
  albumId,
  image,
  loading,
  pathname,
  playlistId,
  playlistName,
}) => {
  const [album, setAlbum] = useState([]);
  const { dispatch } = useContext(PlaylistContext);

  useEffect(() => {
    const fetchAlbums = async () => {
      await axios
        .get(`https://jsonplaceholder.typicode.com/albums?id=${albumId}`)
        .then((response) => {
          setAlbum(response.data);
        })
        .catch((error) => console.error(error));
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="box column is-half">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={image} alt={title} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content is-capitalized">
            <p>
              <strong>Song Title:</strong> <small>{title}</small>
            </p>

            <p>
              <strong>Album Title:</strong>{" "}
              <small>{album.length !== 0 ? album[0].title : "No Title"}</small>
            </p>
          </div>
          {pathname.includes("/AddSong") ? (
            <nav className="level is-mobile">
              <div className="level-right">
                <button
                  className="button is-link is-outlined level-item"
                  onClick={() =>
                    dispatch({
                      type: "ADD_SONG_PLAYLIST",
                      id: playlistId,
                      songs: id,
                    })
                  }
                >
                  <span className="icon is-small">
                    <i className="fas fa-plus-circle"></i>
                  </span>
                </button>
              </div>
            </nav>
          ) : (
            ""
          )}
        </div>
      </article>
    </div>
  );
};

export default Songlist;
