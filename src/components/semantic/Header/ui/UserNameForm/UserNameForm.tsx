import { getUserNameFromLocalStorage } from '../../../../../helpers/gameActions/localStorage';

const UserNameForm = () => {
  const username = getUserNameFromLocalStorage();

  return (
    <form className={'form'} name="username">
      <input
        autoComplete={'off'}
        name={'username'}
        className={'username__input'}
        placeholder={'Your name...'}
        value={username || ''}
        autoFocus={username === ''}
        onChange={console.log} //!TODO: rework
      />
      <button className="button__submit" type="submit"></button>
    </form>
  );
};

export default UserNameForm;
