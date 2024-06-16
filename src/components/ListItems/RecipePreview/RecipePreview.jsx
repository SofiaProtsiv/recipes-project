import PropTypes from 'prop-types';

import { useRemoveRecipeFromFavoritesListMutation } from '../../../redux/auth/AuthApi';
import { useRemoveRecipeMutation } from '../../../redux/recipes/recipesApi';
import { TypeOfList } from '../constants';

import cl from './recipePreview.module.scss';
import ButtonIcon from '../../ui/ButtonIcon';
import ButtonLink from '../../ui/ButtonLink';
// import { useSelector } from 'react-redux';

// const RecipePreview = ({ cardData, typeOfList }) => {
//   const token = useSelector(state => state.authSlice.token);
//
//   const [removeRecipeFromFavoritesList] =
//     useRemoveRecipeFromFavoritesListMutation();
//
//   const [removePersonalRecipe] = useRemoveRecipeMutation();
//
//   const removeFavoriteRecipeHandler = async id => {
//     removeRecipeFromFavoritesList(id);
//     // try {
//     //   await removeRecipeFromFavoritesList({ id, token }).unwrap();
//     // } catch (error) {
//     //   console.error('Failed to remove favorite recipe:', error);
//     // }
//   };
//
//   const removeOwnRecipeHandler = async id => {
//     // removeRecipe(id);
//     try {
//       await removePersonalRecipe({ id, token }).unwrap();
//       // Handle successful removal (e.g., update state or show success message)
//     } catch (error) {
//       console.error('Failed to remove own recipe:', error);
//     }
//   };
//
//   return (
//     <li className={cl.cardContainer}>
//       <div className={cl.cardWrapper}>
//         <img
//           src={cardData.thumb}
//           alt={cardData.title}
//           className={cl.cardImage}
//         />
//         <div>
//           <h3 className={cl.cardTitle}>{cardData.title}</h3>
//           <p className={cl.cardText}>{cardData.instructions}</p>
//         </div>
//       </div>
//       <ul className={cl.listButton}>
//         <li>
//           <ButtonLink
//             icon="arrow_up_right"
//             to={`recipe/${cardData._id}`}
//           ></ButtonLink>
//         </li>
//         <li className={typeOfList === TypeOfList.Recipes && cl.hiddenButton}>
//           <ButtonIcon
//             onClick={
//               typeOfList === TypeOfList.MyFavoritesRecipes
//                 ? () => removeFavoriteRecipeHandler(cardData._id)
//                 : () => removeOwnRecipeHandler(cardData._id)
//             }
//             icon="trash"
//           ></ButtonIcon>
//         </li>
//       </ul>
//     </li>
//   );
// };

const RecipePreview = ({ cardData, typeOfList }) => {
  const [removeRecipeFromFavoritesList] =
    useRemoveRecipeFromFavoritesListMutation();

  const [removeRecipe] = useRemoveRecipeMutation();

  const removeFavoriteRecipeHandler = id => {
    removeRecipeFromFavoritesList(id);
  };

  const removeOwnRecipeHandler = id => {
    removeRecipe(id);
  };

  return (
    <li className={cl.cardContainer}>
      <div className={cl.cardWrapper}>
        <img
          src={cardData.thumb}
          alt={cardData.title}
          className={cl.cardImage}
        />
        <div>
          <h3 className={cl.cardTitle}>{cardData.title}</h3>
          <p className={cl.cardText}>{cardData.instructions}</p>
        </div>
      </div>
      <ul className={cl.listButton}>
        <li>
          <ButtonLink
            icon="arrow_up_right"
            to={`recipe/${cardData._id}`}
          ></ButtonLink>
        </li>
        <li
          className={
            typeOfList === TypeOfList.Recipes ? cl.hiddenButton : undefined
          }
        >
          <ButtonIcon
            onClick={
              typeOfList === TypeOfList.MyFavoritesRecipes
                ? () => removeFavoriteRecipeHandler(cardData._id)
                : () => removeOwnRecipeHandler(cardData._id)
            }
            icon="trash"
          ></ButtonIcon>
        </li>
      </ul>
    </li>
  );
};

RecipePreview.propTypes = {
  cardData: PropTypes.shape({
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  typeOfList: PropTypes.oneOf(Object.values(TypeOfList)),
};

export default RecipePreview;
