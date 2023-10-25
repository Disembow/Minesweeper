import {
  INITIAL_GAME_MODE,
  LOCAL_STORAGE_MODE_KEY,
  LOCAL_STORAGE_RESULTS_KEY,
  LOCAL_STORAGE_USERNAME_KEY,
} from '../game/variables.ts';

const setGameModeToLocalStorage = (mode: string = INITIAL_GAME_MODE): void => {
  localStorage.setItem(LOCAL_STORAGE_MODE_KEY, mode);
};

const getGameModeFromLocalStorage = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_MODE_KEY);
};

const setUserNameToLocalStorage = (username: string): void => {
  localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);
};

const getUserNameFromLocalStorage = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
};

const setGameTopResults = (res: string): void => {
  const rawData = JSON.stringify(res);
  localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, rawData);
};

const getGameTopResults = (): string | null => {
  const rawData: string | null = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);

  if (rawData) return JSON.parse(rawData);

  return null;
};

export {
  setGameModeToLocalStorage,
  getGameModeFromLocalStorage,
  setUserNameToLocalStorage,
  getUserNameFromLocalStorage,
  setGameTopResults,
  getGameTopResults,
};
