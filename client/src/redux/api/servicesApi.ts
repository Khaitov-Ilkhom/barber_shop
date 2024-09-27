import {api} from "./index.ts";
import {AllServices} from "../../types";
import {FieldType} from "../../routes/dashboard/service/Service.tsx";


const servicesApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    getAllService: build.query<AllServices, void>({
      query: () => ({
        url: "/service",
      }),
      providesTags: ["SERVICE"]
    }),
    createNewService: build.mutation<AllServices, FieldType>({
      query: (body) => ({
        url: `/service`,
        method: "POST",
        body
      }),
      invalidatesTags: ["SERVICE"]
    }),
  })
})

export const {useGetAllServiceQuery, useCreateNewServiceMutation} = servicesApi