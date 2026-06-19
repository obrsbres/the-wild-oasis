import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate:checkin, isLoading:isCheckingin } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {...breakfast, status:'checked-in',isPaid:true}),
        onSuccess: (data) => {//its a data which is returned in function
  
            toast(`Successfully #${data.id} checked in`); 
            queryClient.invalidateQueries({ active: true })//validate all queries active on the page
            navigate('/')//to dashboard / homepage
        },
        onError:()=>toast.error('THere was un error while checking in')
})
    return {checkin, isCheckingin}
}