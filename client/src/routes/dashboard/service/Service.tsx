import {
  useCreateNewServiceMutation,
  useDeleteServiceMutation, useEditServiceMutation,
  useGetAllServiceQuery
} from "../../../redux/api/servicesApi.ts";
import {Button, Form, FormProps, Image, Input, InputNumber, message, Modal, Table, TableColumnsType} from "antd";
import {useEffect, useState} from "react";
import {MdModeEdit, MdDelete} from "react-icons/md";
import {useForm} from "antd/es/form/Form";
import {type Service} from "../../../types";

export type FieldType = {
  name: string;
  price: number;
  image: string;
};

const Service = () => {
  const [form] = useForm()
  const [editService, setEditService] = useState<Service | any>(null)
  const [open, setOpen] = useState<boolean>(false);
  const {data} = useGetAllServiceQuery()
  const [newService, {isSuccess, isError}] = useCreateNewServiceMutation()
  const [editServices, {isSuccess: editSuccess, isError: editError}] = useEditServiceMutation()
  const [deleteService, {
    isSuccess: deleteSuccess,
    isError: deleteError,
    isLoading: deleteLoading
  }] = useDeleteServiceMutation()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (editService !== null) {
      editServices({id: editService._id, ...values})
    } else {
      newService(values)
    }
    setOpen(false)
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleCreateService = () => {
    setOpen(true)
  }
  const handleUpdate = (service: Service) => {
    setEditService(service)
    setOpen(true)
  }
  const modalCancel = () => {
    setOpen(false)
    setEditService(null)
  }
  const deletedService = (service: Service) => {
    deleteService({id: service._id})
  }
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
      render: (service) => <Image className="!w-[50px] !h-[50px] object-cover rounded-xl shadow" src={service.image}
                                  alt="Service image"/>
    },
    {
      title: 'Actions',
      render: (service) => <div>
        <Button className="mx-1 text-[20px] !border-yellow-500 bg-yellow-400 !text-black hover:!bg-yellow-300"
                onClick={() => handleUpdate(service)}><MdModeEdit/></Button>
        <Button loading={deleteLoading}
                className="mx-1 text-[20px] !border-red-600 bg-red-500 !text-black hover:!bg-red-400"
                onClick={() => deletedService(service)}><MdDelete/></Button>
      </div>
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully created service")
      form.resetFields()
      setEditService(null)
    }
    if (isError) {
      message.error("Error created service")
      form.resetFields()
    }
  }, [isSuccess, isError, form]);
  useEffect(() => {
    if (deleteSuccess) {
      message.success("Successfully delete service")
    }
    if (deleteError) {
      message.error("Error deleting service")
    }
  }, [deleteSuccess, deleteError]);
  useEffect(() => {
    if (editSuccess) {
      message.success("Successfully updating service")
      setEditService(null)
    }
    if (editError) {
      message.error("Error updating service")
    }
  }, [editSuccess, editError]);
  useEffect(() => {
    form.setFieldsValue({
      ...editService
    });
    if (editService === null) {
      form.resetFields();
    }
  }, [editService, form]);

  return (
      <div>
        <div className="mb-4">
          <Button onClick={() => handleCreateService()}>Create service</Button>
        </div>
        <Table columns={columns} dataSource={data?.payload?.map(service => ({key: service._id, ...service}))}/>
        <Modal
            className="max-w-[450px]"
            title={editService !== null ? "Edit service" : "Create service"}
            footer={null}
            maskClosable={false}
            open={open}
            forceRender={true}
            onCancel={modalCancel}
        >
          <Form
              form={form}
              name="basic"
              layout={"vertical"}
              className="w-full p-4"
              initialValues={editService || null}
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
                  {required: true, message: 'Please input service image !'},
                  {type: "url", message: "This field must be a valid url."}
                ]}
            >
              <Input placeholder="Service image url //https:"/>
            </Form.Item>

            <Form.Item>
              <Button className="w-full" type="primary" htmlType="submit">
                {
                  editService !== null ? "Edit Service" : "Create Service"
                }
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}
export default Service