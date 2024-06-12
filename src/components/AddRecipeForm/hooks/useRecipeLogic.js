import { useState } from 'react';
import { useAddRecipeMutation } from '../../../redux/recipes/recipesApi';
import { useGetCategoriesQuery } from '../../../redux/categories/categoriesApi';
import { useGetIngredientsQuery } from '../../../redux/ingredients/ingredientsApi';
import { useGetAreasQuery } from '../../../redux/areas/areasApi';

export const useRecipeLogic = (setValue, getValues, setError, setReset) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const { data: categories } = useGetCategoriesQuery();
  const { data: ingredients } = useGetIngredientsQuery();
  const { data: area } = useGetAreasQuery();
  const [addRecipe] = useAddRecipeMutation();

  const categoryOptions = categories?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })) || [];

  const ingredientOptions = ingredients?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })) || [];

  const areaOptions = area?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })) || [];

  const handleClear = (reset) => {
    reset();
    setImagePreview(null);
    setSelectedIngredients([]);
  };

  const handleResetForm = () => {
    setReset();
    setImagePreview(null);
    setSelectedIngredients([]);
  }

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeIngredient = id => {
    setSelectedIngredients(prev =>
      prev.filter(el => el._id !== id)
    );
  };

  const addIngredient = () => {
    const { ingredient, measure } = getValues('ingredients')[0];
    if (!ingredient || !measure) {
      setError('ingredients', {
        type: 'required',
        message: 'Both ingredient and measure must be filled',
      });
      return;
    }

    const isAlreadySelected = selectedIngredients.find(
      i => i._id === ingredient.value
    );
    if (isAlreadySelected) {
      setError('ingredients', {
        type: 'required',
        message: 'This ingredient is already in the list',
      });
      return;
    }

    const option = ingredients.find(i => i._id === ingredient.value);
    if (option) {
      setSelectedIngredients(prevIngredients => [
        ...prevIngredients,
        {
          ...option,
          measure: measure,
        },
      ]);
    }
    setValue('ingredients', [{ ingredient: null, measure: '' }]);
  };

  const onSubmit = data => {
    if (selectedIngredients.length === 0) {
      setError('ingredients', {
        type: 'manual',
        message: 'At least one ingredient should be added',
      });
      return;
    }

    const formattedData = {
      title: data.title,
      description: data.description,
      category: data.category.value,
      area: data.area.value,
      ingredients: selectedIngredients.map(ing => ({
        id: ing._id,
        measure: ing.measure,
      })),
      instructions: data.instructions,
      time: data.time.toString(),
      thumb: data.thumb,
    };

    addRecipe(formattedData);
    handleResetForm();
  };

  return {
    categoryOptions,
    ingredientOptions,
    areaOptions,
    imagePreview,
    selectedIngredients,
    handleClear,
    handleImageChange,
    removeIngredient,
    addIngredient,
    onSubmit,
  };
};
