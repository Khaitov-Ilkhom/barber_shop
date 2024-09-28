import {api} from "./index.ts";
import {AllServices, Id, Service} from "../../types";
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
    editService: build.mutation<Service, any>({
      query: (body) => ({
        url: `/service/${body.id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["SERVICE"]
    }),
    deleteService: build.mutation<AllServices, Id>({
      query: ({id}) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SERVICE"]
    }),
  })
})

export const {useGetAllServiceQuery, useCreateNewServiceMutation, useDeleteServiceMutation, useEditServiceMutation} = servicesApi