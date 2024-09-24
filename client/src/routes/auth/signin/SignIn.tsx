import {FC, useEffect} from "react";
import type { FormProps } from "antd";
import {Button, Form, Input, message, Typography} from "antd";
import { useDispatch } from "react-redux";
import {useSignInMutation} from "../../../redux/api/authApi.ts";
import {signIn} from "../../../redux/slice/authSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch} from "../../../redux/store";

export type FieldTypeL = {
  phone: string,
  password: string
}

const {Title, Text} = Typography

const SignIn: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [signInRequest, {data, isSuccess, isError}] = useSignInMutation();
  const navigate = useNavigate()

  const onFinish: FormProps<FieldTypeL>["onFinish"] = (values) => {
    signInRequest(values)
  };

  useEffect(() => {
    if(isSuccess){
      message.success("Successfully logged")
      dispatch(signIn(data.token))
      navigate("/")
    }
    if (isError) {
      message.error("Logged error")
    }
  }, [isSuccess, isError])

  const onFinishFailed: FormProps<FieldTypeL>["onFinishFailed"] = (
      errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <div className="w-[400px] bg-white p-6 rounded-xl shadow-2xl">
        <Form
            name="basic"
            layout={"vertical"}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
        >
          <Title className="text-center">Sign In</Title>
          <Form.Item<FieldTypeL>
              className="mb-2"
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input placeholder="+998 (00) 123 45 67"/>
          </Form.Item>

          <Form.Item<FieldTypeL>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="********"/>
          </Form.Item>

          <Form.Item>
            <Button className="w-full !bg-slate-500 !text-white active:scale-95 active:bg-slate-500" type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Text >Dont you have account? <Link className="!text-slate-500" to="/auth/sign-up">Sign Up</Link></Text>
        </div>
      </div>
  );
};

export default SignIn;