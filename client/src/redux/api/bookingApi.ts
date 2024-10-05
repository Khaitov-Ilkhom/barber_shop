import {api} from "./index.ts";
import {AllBooking, AllBookingForUser, Booking, NewBooking, ServicePrice} from "../../types";

const servicesApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    getAllBooking: build.query<AllBooking, void>({
      query: () => ({
        url: "/booking",
      }),
      providesTags: ["BOOKING"]
    }),
    getUserAllBooking: build.query<AllBooking, void>({
      query: (params) => ({
        url: `/booking/user-booking`,
        params
      }),
      providesTags: ["BOOKING"]
    }),
    getAllBookingForUser: build.query<AllBookingForUser, string | {date: string}>({
      query: (params) => ({
        url: "/booking/available",
        params
      }),
      providesTags: ["BOOKING"]
    }),
    createNewBooking: build.mutation<NewBooking, Booking>({
      query: (body) => ({
        url: `/booking`,
        method: "POST",
        body
      }),
      invalidatesTags: ["BOOKING"]
    }),
    calculatingServicePrice: build.mutation<ServicePrice, string[]>({
      query: (body) => ({
        url: `/booking/calculate`,
        method: "POST",
        body: {service: body}
      }),
      invalidatesTags: ["BOOKING"]
    }),
  })
})

export const {useGetAllBookingQuery, useGetAllBookingForUserQuery, useCreateNewBookingMutation, useCalculatingServicePriceMutation, useGetUserAllBookingQuery} = servicesApi