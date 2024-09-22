import {FC, useEffect} from "react";
import type { FormProps } from "antd";
import {Button, Form, Input, message, Typography} from "antd";
import {useSignUpMutation} from "../../../redux/api/authApi.ts";
import {Link, useNavigate} from "react-router-dom";

export type FieldType = {
  first_name: string;
  last_name:  string;
  phone:      string;
  password:   string;
}

const {Title, Text} = Typography

const SignUp: FC = () => {
  const [signInRequest, {isSuccess, isError}] = useSignUpMutation();
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    signInRequest(values)
  };

  useEffect(() => {
    if(isSuccess){
      message.success("Registered successfully")
      navigate("/auth")
    }
    if (isError) {
      message.error("Registered Error")
    }
  }, [isSuccess, isError])

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
      errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <div className="w-[400px] bg-white p-6 rounded-xl shadow-2xl">
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout={"vertical"}
            className="w-full"
        >
          <Title className="text-center">Sign up</Title>
          <Form.Item<FieldType>
              className="mb-2"
              label="FirstName"
              name="first_name"
              rules={[{ required: true, message: "Please input your firstname!" }]}
          >
            <Input placeholder="Firstname"/>
          </Form.Item>

          <Form.Item<FieldType>
              className="mb-2"
              label="LastName"
              name="last_name"
              rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input placeholder="Lastname"/>
          </Form.Item>

          <Form.Item<FieldType>
              className="mb-2"
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input placeholder="+998 (00) 123 45 67"/>
          </Form.Item>

          <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="********"/>
          </Form.Item>

          <Form.Item>
            <Button className="w-full !bg-slate-500 !text-white active:scale-95 active:bg-slate-500" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Text >Already have an account? <Link className="!text-slate-500" to="/auth">Sign In</Link></Text>
        </div>
      </div>
  );
};

export default SignUp;