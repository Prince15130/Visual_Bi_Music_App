import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Songlist from "./songlist";
import { Pagination } from "./Pagination";
import { PlaylistContext } from "../context/PlaylistContext";

function AllSongs({ match, location }) {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(10);
  const {
    params: { playlistId, playlistName },
  } = match;
  const { pathname } = location;
  const { dispatch } = useContext(PlaylistContext);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      await axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((response) => {
          setSongs(response.data);
          dispatch({
            type: "ADD_SONGS",
            allsongs: response.data,
          });
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    fetchSongs();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  // Get current Songs
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  // Change page
  //const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changePage = (direction, pageNumber) => {
    if (direction === "next") {
      setCurrentPage(pageNumber + 1);
    }
    if (direction === "back") {
      setCurrentPage(pageNumber - 1);
    }
  };

  return (
    <div className="container is-max-desktop">
      <div className="control has-icons-left">
        <input
          className="input is-rounded"
          type="text"
          onChange={handleChange}
          placeholder="Search Songs"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>
      <div className="columns is-multiline mt-5">
        {currentSongs.map((song) => {
          return (
            <Songlist
              key={song.id}
              title={song.title}
              id={song.id}
              albumId={song.albumId}
              image={song.thumbnailUrl}
              loading={loading}
              pathname={pathname}
              playlistId={playlistId}
              playlistName={playlistName}
            />
          );
        })}
      </div>
      <Pagination
        songsPerPage={songsPerPage}
        totalSongs={5000}
        paginate={changePage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default AllSongs;
