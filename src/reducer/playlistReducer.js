import { v4 as uuidv4 } from "uuid";

export const playlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLAYLIST":
      return {
        ...state,
        playlist: [
          ...state.playlist,
          {
            title: action.playlist.title,
            createdAt: new Date().toUTCString(),
            songs: [],
            id: uuidv4(),
          },
        ],
      };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter(
          (playlist) => playlist.id !== action.id
        ),
      };

    case "ADD_SONG_PLAYLIST":
      let index = state.playlist.findIndex(
        (playlist) => playlist.id === action.id
      );
      let todos = [...state.playlist];

      const todoPlaylist = { ...todos[index] };
      const todoPlaylistSong = [...todoPlaylist.songs];
      todoPlaylistSong.push(action.songs);
      todoPlaylist.songs = todoPlaylistSong;
      todos[index] = todoPlaylist;

      return { ...state, playlist: todos };

    case "DELETE_SONG_PLAYLIST":
      const playlistIndex = state.playlist.findIndex(
        (playlist) => playlist.id === action.id
      );
      let playListTodo = [...state.playlist];
      const PlaylistTodoIndex = { ...playListTodo[playlistIndex] };
      const PlaylistSong = [...PlaylistTodoIndex.songs];
      const afterDeletedList = PlaylistSong.filter(
        (song) => song !== action.songs
      );
      PlaylistTodoIndex.songs = afterDeletedList;
      playListTodo[playlistIndex] = PlaylistTodoIndex;
      return { ...state, playlist: playListTodo };

    case "SHUFFLE_SONG":
      const shuffleIndex = state.playlist.findIndex(
        (playlist) => playlist.id === action.id
      );
      let shuffleTodo = [...state.playlist];
      const shuffleTodoIndex = { ...shuffleTodo[shuffleIndex] };
      const shuffleSongs = [...shuffleTodoIndex.songs];

      var currentIndex = shuffleSongs.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = shuffleSongs[currentIndex];
        shuffleSongs[currentIndex] = shuffleSongs[randomIndex];
        shuffleSongs[randomIndex] = temporaryValue;
      }

      shuffleTodoIndex.songs = shuffleSongs;
      shuffleTodo[shuffleIndex] = shuffleTodoIndex;

      return { ...state, playlist: shuffleTodo };

    case "ADD_SONGS":
      return {
        ...state,
        playlist: state.playlist ? state.playlist : [],
        allsongs: action.allsongs,
      };
    default:
      return state;
  }
};
