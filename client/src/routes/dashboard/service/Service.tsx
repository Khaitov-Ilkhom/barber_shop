import {useCreateNewServiceMutation, useGetAllServiceQuery} from "../../../redux/api/servicesApi.ts";
import {Button, Form, FormProps, Image, Input, InputNumber, message, Modal, Table, TableColumnsType} from "antd";
import {useEffect, useState} from "react";
import useSearchParamsHook from "../../../params-hook/paramsHook.ts";

export type FieldType = {
  name: string;
  price: number;
  image: string;
};

const Service = () => {
  const {data} = useGetAllServiceQuery()
  const [newService, {isSuccess, isError}] = useCreateNewServiceMutation()
  const {getParam, setParam, removeParam} = useSearchParamsHook()
  const [open, setOpen] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    newService(values)
    console.log(values)
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns: TableColumnsType = [
    {
      title: 'Service name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => <span>${price}</span>
    },
    {
      title: 'Image',
      render: (service) => <Image className="!w-[60px] rounded-xl shadow" src={service.image} alt="Service image"/>
    },
    {
      title: 'Actions',
      render: (service) => <Button onClick={() => handleUpdate(service)}>Edit service</Button>
    },
  ];

  const handleCreateService = () => {
    setParam("service", "create")
    setOpen(true)
  }

  const handleUpdate = (service: FieldType) => {
    setParam("service", "update")
    console.log(service)
    setOpen(true)
  }

  const modalCancel = () => {
    setOpen(false)
    removeParam("service")
  }

  useEffect(() => {
    if (getParam("service")) return setOpen(true)
    return removeParam("service")
  }, []);

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully created service")
    }
    if (isError) {
      message.error("Error created service")
    }
  }, [isSuccess, isError]);

  return (
      <div>
        <div className="mb-4">
          <Button onClick={() => handleCreateService()}>Create service</Button>
        </div>
        <Table columns={columns} dataSource={data?.payload?.map(service => ({key: service._id, ...service}))}/>
        <Modal
            className="max-w-[450px]"
            title={"Create service"}
            footer={null}
            maskClosable={false}
            open={open}
            onCancel={modalCancel}
        >
          <Form
              name="basic"
              layout={"vertical"}
              className="w-full p-4"
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
            <div className="w-full flex justify-between items-center gap-4">
              <Form.Item<FieldType>
                  label="Service name"
                  name="name"
                  rules={[{required: true, message: 'Please input service name!'}]}
              >
                <Input placeholder="Haircut, Shave and more"/>
              </Form.Item>

              <Form.Item<FieldType>
                  label="Service price"
                  name="price"
                  rules={[{required: true, message: 'Please input service price!'}]}
              >
                <InputNumber className="w-full" min={1} placeholder="Service price"/>
              </Form.Item>
            </div>

            <Form.Item<FieldType>
                label="Service image"
                name="image"
                rules={[
                  {
                    required: true, message: 'Please input service image !'
                  },
                  {
                    type: "url", message: "This field must be a valid url."
                  }
                ]}
            >
              <Input placeholder="Service image url //https:"/>
            </Form.Item>

            <Form.Item>
              <Button className="w-full" type="primary" htmlType="submit">
                Create Service
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}
export default Service
