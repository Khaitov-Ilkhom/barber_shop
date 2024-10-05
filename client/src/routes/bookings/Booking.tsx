import BookingCreate from "../../components/boking-create/BookingCreate.tsx";
import Header from "../../components/header/Header.tsx";
import AllBooking from "../../components/all-booking/AllBookings.tsx";
import {useGetUserAllBookingQuery} from "../../redux/api/bookingApi.ts";

const Booking = () => {
  const {data} = useGetUserAllBookingQuery()
  return (
      <div>
        <Header/>
        <BookingCreate/>
        <AllBooking data={data}/>
      </div>
  )
}
export default Booking
