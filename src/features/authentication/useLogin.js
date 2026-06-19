import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success('Login successful');
      navigate('/dashboard', { replace: true });
      queryClient.setQueryData(['user'], data.user); //this is for saving in cache the
      //  user data after login / we can set that here too.
    },
    onError: (error) => {
      toast.error(error.message, 'Login failed');
      console.error('useLogin onError', error);
    },
  });
  return { login, isLoging };
}
