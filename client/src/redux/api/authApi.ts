import { api } from "./index";
import {FieldTypeL} from "../../routes/auth/signin/SignIn.tsx";
import {Login, UserData} from "../../types";
import {FieldType} from "../../routes/auth/signup/SignUp.tsx";

const authApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    signUp: build.mutation<UserData, FieldType>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body
      }),

    }),
    signIn: build.mutation<Login, FieldTypeL>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body
      })
    }),
    getProfile: build.query<UserData, void>({
      query: () => ({
        url: "/auth/profile"
      }),
      providesTags: ["AUTH"]
    }),
    updateProfile: build.mutation<UserData, FieldType>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body
      }),
      invalidatesTags: ["AUTH"]
    })
  })
})

export const {useSignInMutation, useSignUpMutation, useGetProfileQuery, useUpdateProfileMutation} = authApi;