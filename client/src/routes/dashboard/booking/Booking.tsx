import AllBookings from "../../../components/all-booking/AllBookings.tsx";
import {useGetAllBookingQuery} from "../../../redux/api/bookingApi.ts";

const Booking = () => {
  const {data} = useGetAllBookingQuery()

  return (
      <AllBookings data={data}/>
  )
}
export default Booking
