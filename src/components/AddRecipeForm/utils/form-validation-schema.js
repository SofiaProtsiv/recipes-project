import * as yup from 'yup';

export const schema = yup.object().shape({
  photo: yup.mixed().test('fileType', 'Only images are allowed', value => {
    return !value.length || (value[0] && value[0].type.startsWith('image/'));
  }),
  name: yup.string().required('Recipe name is required'),
  category: yup.string().required('Category is required'),
  cookingTime: yup
    .number()
    .min(1, 'Cooking time must be at least 1 minute')
    .required(),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        ingredient: yup.string().required('Ingredient is required'),
        quantity: yup.string().required('Quantity is required'),
      })
    )
    .min(1, 'At least one ingredient is required'),
  preparation: yup
    .string()
    .max(200, 'Maximum 200 characters allowed')
    .required('Recipe preparation is required'),
});
