import cls from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={cls.preloader}>
      <div className={cls.preloader__item} />
    </div>
  );
};

export default Preloader;
