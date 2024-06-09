import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './utils/form-validation-schema';
import FormGroup from './components/FormGroup';
import FileInput from './components/FileInput';
import IngredientField from './components/IngredientField';
import CookingTimeControl from './components/CookingTimeControl';
import cl from './addRecipeForm.module.scss';

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cookingTime: 0,
      ingredients: [{ ingredient: '', quantity: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const currentCookingTime = watch('cookingTime', 0);

  const handleReset = () => {
    reset();
    setImagePreview(null);
  };

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

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={cl['fileInput-container']}>
        <FormGroup label="Upload a Photo" error={errors.photo?.message}>
          <FileInput
            id="file-input"
            register={register('photo')}
            onChange={handleImageChange}
            imagePreview={imagePreview}
          />
        </FormGroup>
      </div>

      <div className={cl['recipeInfo-container']}>
        <FormGroup label="The name of the recipe" error={errors.name?.message}>
          <input
            type="text"
            {...register('name')}
            className={cl.input}
            placeholder="Enter a description of the dish"
          />
          <span>0/200</span>
        </FormGroup>

        <FormGroup label="Category" error={errors.category?.message}>
          <select {...register('category')}>
            <option value="">Select...</option>
            <option value="appetizer">Appetizer</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
          </select>
        </FormGroup>

        <FormGroup label="Cooking Time" error={errors.cookingTime?.message}>
          <CookingTimeControl
            value={currentCookingTime}
            onDecrement={() =>
              setValue('cookingTime', Math.max(0, currentCookingTime - 1))
            }
            onIncrement={() => setValue('cookingTime', currentCookingTime + 1)}
          />
        </FormGroup>

        <FormGroup label="Ingredients" error={errors.ingredients?.message}>
          {fields.map((field, index) => (
            <IngredientField
              key={field.id}
              index={index}
              register={register}
              remove={() => remove(index)}
              errors={errors.ingredients?.[index]}
            />
          ))}
          <button
            type="button"
            onClick={() => append({ ingredient: '', quantity: '' })}
          >
            Add Ingredient
          </button>
        </FormGroup>

        <FormGroup
          label="Recipe Preparation"
          error={errors.preparation?.message}
        >
          <textarea {...register('preparation')} />
        </FormGroup>

        <div className={cl['form-actions']}>
          <button type="button" onClick={handleReset}>
            Clear
          </button>
          <button type="submit">Publish</button>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
