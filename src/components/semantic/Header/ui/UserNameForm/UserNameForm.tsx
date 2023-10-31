import { useEffect, useState } from 'react';
import {
  getUserNameFromLocalStorage,
  setUserNameToLocalStorage,
} from 'helpers/gameActions/localStorage';
import cls from './UserNameForm.module.scss';

const UserNameForm = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const nickname = getUserNameFromLocalStorage();
    nickname ? setUsername(nickname) : setUsername('Anonymous');
  }, []);

  const handleUsernameForm = (e: React.FormEvent) => {
    e.preventDefault();
    setUserNameToLocalStorage(username);
  };

  return (
    <form className={cls.form} onSubmit={handleUsernameForm}>
      <input
        autoComplete={'off'}
        name={'username'}
        className={cls.username__input}
        placeholder={'Your name...'}
        value={username === 'Anonymous' ? '' : username}
        autoFocus={username === ''}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className={cls.button__submit} type="submit" onClick={handleUsernameForm} />
    </form>
  );
};

export default UserNameForm;
