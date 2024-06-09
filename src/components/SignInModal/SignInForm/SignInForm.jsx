import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInput from '../../ui/TextInput';
import PasswordInput from '../../ui/PasswordInput';
import SubmitButton from '../../ui/SubmitButton';
import cl from './signInForm.module.scss';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = data => {
    // Відправка даних на backend
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={cl.wrapper}>
        <TextInput
          type="email"
          placeholder="Email*"
          register={register}
          errors={errors}
          name="email"
          onBlur={() => trigger('email')}
        />
        <PasswordInput
          register={register}
          errors={errors}
          onBlur={() => trigger('password')}
        />
      </div>

      <SubmitButton disabled={!isValid}>Sign in</SubmitButton>
    </form>
  );
};

export default SignInForm;
