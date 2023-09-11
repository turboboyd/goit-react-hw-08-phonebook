import css from './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.errorContain}>
      <div className={css.errorText}>
        <h1 className={css.errorHeading}>404</h1>
        <p>Page not found.</p>
        <p>We searched high and low.</p>
      </div>
      <div className={css.binoculars}>
        <div className={css.backBino}></div>
        <div className={css.leftBino}></div>
        <div className={css.rightBino}></div>
        <div className={css.leftBinoLense}>
          <div className={css.eye}></div>
        </div>
        <div className={css.rightBinoLense}>
          <div className={css.eye}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
