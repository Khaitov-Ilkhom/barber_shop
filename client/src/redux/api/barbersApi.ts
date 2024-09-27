import {api} from "./index.ts";
import {AllUser} from "../../types";

const barbersApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    getAllBarbers: build.query<AllUser, void>({
      query: () => ({
        url: "/users/barbers",
      }),
      providesTags: ["USERS"]
    })
  })
})

export const {useGetAllBarbersQuery} = barbersApi