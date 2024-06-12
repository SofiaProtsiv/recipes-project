import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../../redux/recipes/recipesApi';
import cl from './pathInfo.module.scss';

const PathInfo = () => {
  const location = useLocation();
  const { recipeId } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(recipeId);
  const path = location.pathname;

  const generateBreadcrumb = () => {
    if (path === '/recipe/add') {
      return 'Add recipe';
    } else if (path.startsWith('/recipe/')) {
      return recipe?.title;
    } else if (path.startsWith('/user')) {
      return 'Profile';
    } else {
      return '';
    }
  };
  const isRecipeFound = path.startsWith('/recipe/') && recipe;
  return (
    <div className={cl.breadcrumb}>
      <Link to="/" className={cl['home-link']}>
        Home
      </Link>
      {isRecipeFound ? <span>/</span> : null}

      <p className={cl.link}>{generateBreadcrumb()}</p>
    </div>
  );
};

export default PathInfo;
