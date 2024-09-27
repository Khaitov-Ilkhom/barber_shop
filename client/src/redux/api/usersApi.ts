import {api} from "./index.ts";
import {ChangeRoleReq, ChangeRoleRes, Id, Message, AllUser} from "../../types";


const usersApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    getAllUsers: build.query<AllUser, {"user-status" : string | null}>({
      query: (params) => ({
        url: "/users",
        params
      }),
      providesTags: ["USERS"]
    }),
    archivedUser: build.mutation<Message, Id>({
      query: ({id}) => ({
        url: `/users/archive/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"]
    }),
    unArchivedUser: build.mutation<Message, Id>({
      query: ({id}) => ({
        url: `/users/unarchive/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"]
    }),
    changeRole: build.mutation<ChangeRoleRes, ChangeRoleReq>({
      query: ({newRole, id}) => ({
        url: `/users/update-role/${id}`,
        method: "PATCH",
        body: {newRole}
      }),
      invalidatesTags: ["USERS"]
    }),
  })
})

export const {useGetAllUsersQuery, useArchivedUserMutation, useUnArchivedUserMutation, useChangeRoleMutation} = usersApi