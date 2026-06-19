import { useForm } from 'react-hook-form';

import { useSignup } from './useSignup';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ mode: 'onChange' }); //default mode is 'onSubmit' but we want to validate on change

  const { signup, isLoading } = useSignup();

  function onSubmit({ email, password, fullName }) {
    signup(
      { email, password, fullName },
      {
        onSettled: reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors.fullName?.message}>
        <Input
          disabled={isLoading}
          type='text'
          id='fullName'
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors.email?.message}>
        <Input
          disabled={isLoading}
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password?.message}
      >
        <Input
          disabled={isLoading}
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' disabled={isLoading}>
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Create new user'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
