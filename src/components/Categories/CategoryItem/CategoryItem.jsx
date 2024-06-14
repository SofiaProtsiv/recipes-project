import { useMediaPredicate } from 'react-media-hook';
import cl from './categoryItem.module.scss';
import ButtonLink from '../../ui/ButtonLink';
import { Link } from 'react-router-dom';

export default function CategoryItem({ name, isWide }) {
  const IS_HIRESOLUTION = useMediaPredicate('(min-resolution: 192dpi)');
  const ext = IS_HIRESOLUTION ? 'webp' : 'jpg';
  const IS_ALL = name === 'All categories';

  const bgStyle = IS_ALL
    ? { backgroundColor: 'var(--primary-text-color' }
    : {
        backgroundImage: `url(./images/categories/${name.toLowerCase()}.${ext}), linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)`,
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
              to={`categories/${name.toLowerCase()}`}
            />
          </div>
        )}

        {IS_ALL && (
          <Link className={cl['link-to-all']} to={`categories/all`}>
            <p>{name}</p>
          </Link>
        )}
      </li>
    </>
  );
}
