import {api} from "./index.ts";
import {AllBooking, AllBookingForUser, NewBooking} from "../../types";


const servicesApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    getAllBooking: build.query<AllBooking, void>({
      query: () => ({
        url: "/booking",
      }),
      providesTags: ["SERVICE"]
    }),
    getAllBookingForUser: build.query<AllBookingForUser, void>({
      query: () => ({
        url: "/booking/available",
      }),
      providesTags: ["SERVICE"]
    }),
    createNewBooking: build.mutation<NewBooking, void>({
      query: (body) => ({
        url: `/booking`,
        method: "POST",
        body
      }),
      invalidatesTags: ["SERVICE"]
    }),
  })
})

export const {useGetAllBookingQuery, useGetAllBookingForUserQuery, useCreateNewBookingMutation} = servicesApi