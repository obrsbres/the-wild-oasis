import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import { useLogin } from './useLogin';
function LoginForm() {
  const [email, setEmail] = useState('nacver3@gmail.com');
  const [password, setPassword] = useState('jjj');

  const { login, isLoging } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address' orientation='vertical'>
        <Input
          type='email'
          id='email'
          disabled={isLoging}
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label='Password' orientation='vertical'>
        <Input
          type='password'
          id='password'
          disabled={isLoging}
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation='vertical'>
        <Button disabled={isLoging} size='large'>
          {isLoging ? <SpinnerMini /> : 'Log in'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
