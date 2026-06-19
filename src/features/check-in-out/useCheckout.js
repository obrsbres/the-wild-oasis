import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      //its a data which is returned in function
      toast(`Successfully #${data.id} checked out`);
      queryClient.invalidateQueries({ active: true }); //validate all queries active on the page
    },
    onError: () => toast.error('THere was un error while checking out'),
  });
  return { checkout, isCheckingout };
}
