import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('succsessfully singed up, please confirm your email');
    },
    onError: (error) => {
      toast.error(error.message, 'voovov');
      console.error(error);
    },
  });

  return { signup, isLoading };
}
