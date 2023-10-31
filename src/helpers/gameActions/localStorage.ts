import { RawDataType } from './gameProcess.ts';
import { LOCAL_STORAGE_RESULTS_KEY, LOCAL_STORAGE_USERNAME_KEY } from 'app/db/variables.ts';

const setUserNameToLocalStorage = (username: string): void => {
  localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);
};

const getUserNameFromLocalStorage = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
};

const checkIsUserHasName = () => {
  const username = getUserNameFromLocalStorage();
  if (!username) setUserNameToLocalStorage('Anonymous');
};

const setGameTopResults = (res: RawDataType | null): void => {
  const rawData = JSON.stringify(res);
  localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, rawData);
};

const getGameTopResults = (): RawDataType | null => {
  const rawData: string | null = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);

  if (rawData) return JSON.parse(rawData);

  return null;
};

export {
  setUserNameToLocalStorage,
  getUserNameFromLocalStorage,
  checkIsUserHasName,
  setGameTopResults,
  getGameTopResults,
};
