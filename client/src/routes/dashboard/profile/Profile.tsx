import {useGetProfileQuery, useUpdateProfileMutation} from "../../../redux/api/authApi.ts";
import {MdModeEdit} from "react-icons/md";
import {Button, Form, FormProps, Image, Input, message, Modal} from "antd";
import {useEffect, useState} from "react";
import {FieldType} from "../../auth/signup/SignUp.tsx";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data} = useGetProfileQuery()
  const [updateProfile, {isSuccess, isError, isLoading}] = useUpdateProfileMutation()
  const user = data?.payload

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    updateProfile(values)
    console.log(values)
    setIsModalOpen(false)
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully updating profile")
    }
    if (isError) {
      message.error("Error updating profile")
    }
  }, [isSuccess, isError]);

  return (
      <div className="max-w-sm mx-auto text-center bg-white shadow-lg rounded-lg my-4 py-4">
        <div className="bg-slate-400 py-4 rounded-t-lg">
          <div className="flex justify-end px-4">
            <button onClick={() => showModal()} className="text-[24px] active:scale-90 transition duration-500"><MdModeEdit/></button>
          </div>
          <Image
              src={user?.avatar}
              alt={`${user?.first_name}'s avatar`}
              className="!w-24 rounded-full mx-auto mt-4 shadow-lg"
          />
        </div>

        <div className="pt-4">
          <h2 className="text-gray-800 text-2xl font-bold">{user?.first_name} {user?.last_name}</h2>
          <p className="text-gray-600 capitalize">{user?.role}</p>
          <p className="text-gray-600">{user?.phone}</p>
        </div>

        <Modal
            className="max-w-[450px]"
            title="Edit profile"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
        >
          <Form
              name="basic"
              initialValues={user}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout={"vertical"}
              className="w-full "
          >
            <div className="w-full flex justify-between items-center gap-4">
              <Form.Item<FieldType>
                  className="mb-2"
                  label="FirstName"
                  name="first_name"
                  rules={[{required: true, message: "Please input your firstname!"}]}
              >
                <Input placeholder="Firstname"/>
              </Form.Item>

              <Form.Item<FieldType>
                  className="mb-2"
                  label="LastName"
                  name="last_name"
                  rules={[{required: true, message: "Please input your lastname!"}]}
              >
                <Input placeholder="Lastname"/>
              </Form.Item>
            </div>

            <Form.Item<FieldType>
                className="mb-2"
                label="Phone"
                name="phone"
                rules={[
                  {required: true, message: "Please input your phone number!"}
                ]}
            >
              <Input placeholder="+998 00 000 00 00"/>
            </Form.Item>

            <Form.Item<FieldType>
                className="mb-2"
                label="Avatar profile"
                name="avatar"
                rules={[
                  {required: true, message: "Please input your firstname!"},
                  {type: "url", message: "This field must be a valid url."}
                ]}
            >
              <Input placeholder="Service image url //https:"/>
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} className="w-full !bg-slate-500 !text-white active:scale-95 active:bg-slate-500"
                      htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}
export default Profile
