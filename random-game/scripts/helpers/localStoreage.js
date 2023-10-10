import {
  INITIAL_GAME_MODE,
  LOCAL_STORAGE_MODE_KEY,
  LOCAL_STORAGE_RESULTS_KEY,
} from '../game/variables.js';

const setGameModeToLocalStorage = (mode = INITIAL_GAME_MODE) => {
  localStorage.setItem(LOCAL_STORAGE_MODE_KEY, mode);
};

const getGameModeFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_MODE_KEY);
};

const setGameTopResults = (res) => {
  const rawData = JSON.stringify(res);
  localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, rawData);
};

const getGameTopResults = () => {
  const rawData = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);
  const data = JSON.parse(rawData);

  return data;
};

export {
  setGameModeToLocalStorage,
  getGameModeFromLocalStorage,
  setGameTopResults,
  getGameTopResults,
};
