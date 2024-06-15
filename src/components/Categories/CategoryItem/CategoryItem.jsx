import { useMediaPredicate } from 'react-media-hook';
import cl from './categoryItem.module.scss';
import ButtonLink from '../../ui/ButtonLink';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import scrollUpToSection from '../../../utils/scrollUpToSection';

export default function CategoryItem({ name, categoryId, isWide }) {
  const IS_HIRESOLUTION = useMediaPredicate('(min-resolution: 192dpi)');
  const ext = IS_HIRESOLUTION ? 'webp' : 'jpg';
  const IS_ALL = name === 'All categories';

  const bgStyle = IS_ALL
    ? { backgroundColor: 'var(--primary-text-color' }
    : {
        backgroundImage: `url(./images/categories/${name.toLowerCase()}.${ext})`,
      };

  return (
    <>
      <li
        className={`
          ${cl.category}
          ${isWide ? cl.wide : ''}
          ${IS_ALL ? cl['content-center'] : ''}
        `}
        style={bgStyle}
      >
        {!IS_ALL && (
          <div className={cl.content}>
            <p className={cl['name-pill']}>{name}</p>
            <ButtonLink
              icon="arrow_up_right"
              addClass={cl['button-icon']}
              to={`categories/${categoryId}`}
            />
          </div>
        )}

        {IS_ALL && (
          <Link
            className={cl['link-to-all']}
            to={`categories/all`}
            onClick={() => scrollUpToSection('#categories')}
          >
            <p>{name}</p>
          </Link>
        )}
      </li>
    </>
  );
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
};
