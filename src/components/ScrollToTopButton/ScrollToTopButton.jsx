import ScrollToTop from 'react-scroll-up';
import { FaArrowUp } from 'react-icons/fa';
import css from './ScrollToTopButton.module.css';

export default function ScrollToTopButton() {
  return (
    <ScrollToTop showUnder={160}>
      <span className={css.scroll_to_top}>
        <FaArrowUp />
      </span>
    </ScrollToTop>
  );
}
