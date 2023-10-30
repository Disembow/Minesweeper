import cls from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={cls.footer}>
      <a className={cls.github} href="https://github.com/Disembow" target="_blank"></a>
      <p>2023</p>
      <a
        className={cls.linkedin}
        href="https://www.linkedin.com/in/yauhen-naliotau-435238240/"
        target="_blank"
      ></a>
    </footer>
  );
};

export default Footer;
