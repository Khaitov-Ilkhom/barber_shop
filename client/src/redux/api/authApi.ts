import { api } from "./index";
import {FieldTypeL} from "../../routes/auth/signin/SignIn.tsx";
import {Login, Register} from "../../types";
import {FieldType} from "../../routes/auth/signup/SignUp.tsx";

const authApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    signUp: build.mutation<Register, FieldType>({
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
    })
  })
})

export const {useSignInMutation, useSignUpMutation} = authApi;