import {useCalculatingServicePriceMutation, useCreateNewBookingMutation, useGetAllBookingForUserQuery} from "../../redux/api/bookingApi.ts";
import {Button, Calendar, Form, FormProps, message, Modal, Select} from "antd";
import type {Dayjs} from 'dayjs';
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import Barbers, {workTime} from "../../routes/dashboard/barbers/Barbers.tsx";
import {useGetAllBarbersQuery} from "../../redux/api/barbersApi.ts";
import {useGetAllServiceQuery} from "../../redux/api/servicesApi.ts";
import {type Booking} from "../../types";
import {useForm} from "antd/es/form/Form";

const Booking = () => {
  const [form] = useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [barberId, setBarberId] = useState("")
  const [, setServiceId] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)
  const {data: allService} = useGetAllServiceQuery()
  const {data: allBarbers} = useGetAllBarbersQuery()
  const {data} = useGetAllBookingForUserQuery({date: date || new Date().toISOString().split("T")[0]}, {refetchOnMountOrArgChange: true})
  const [createBooking, {isSuccess, isError}] = useCreateNewBookingMutation()
  const [calculatingPrice, {data: total}] = useCalculatingServicePriceMutation()

  const disablePastDates = (current : any ): any => {
    return current && current < dayjs().startOf('day');
  };
  const onChange = (value: Dayjs) => {
    setDate(value.format('YYYY-MM-DD'))
  };

  function checkAvailability(time: string, id: string, type: string) : boolean {
    if (type === "start") {
      return Boolean( data?.payload?.find(booking => booking.barber._id === id && (booking.start <= time && booking.end > time)))
    } else {
      return Boolean(data?.payload?.find(booking => booking.barber._id === id && (booking.start <= time && booking.end >= time)))
    }
  }

  const onSelectBarber = (value: string) => {
    setBarberId(value)
  }
  const onSelectService = (value: string[]) => {
    setServiceId(value)
    calculatingPrice(value)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish: FormProps<Booking>["onFinish"] = (values) => {
    setIsModalOpen(false)
    createBooking({...values, date: date, price: price})
    form.resetFields()
  };
  const onFinishFailed: FormProps<Booking>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (isSuccess) {
      message.success(`Successfully created booking ${date}`)
      setPrice(0)
    }
    if (isError) {
      message.error("Error created booking")
    }
  }, [isSuccess, isError, date]);
  useEffect(() => {
    if (total?.payload) {
      setPrice(total.payload.total)
    }
  }, [total]);

  return (
      <div className="max-w-[1440px] w-full mx-auto">
        <div className="m-4">
          <div className="my-4">
            <Button onClick={() => showModal()}>Create a new booking</Button>
          </div>
          <div>
            <Barbers/>
          </div>
          <Modal
              className="max-w-[700px] !w-full"
              title="Create booking"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              maskClosable={false}
          >
            <div className="w-full flex justify-between items-start gap-6 py-4">
              <div className="max-w-[350px] w-full">
                <Calendar defaultValue={dayjs()} disabledDate={disablePastDates} fullscreen={false}
                          onChange={onChange}/>
              </div>
              <div className="w-full">
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout={"vertical"}
                    className="w-full"
                >
                  <Form.Item<Booking>
                      className="mb-2"
                      label="Barber"
                      name="barber"
                      rules={[{required: true, message: "Please select barber!"}]}
                  >
                    <Select
                        placeholder="Select barber"
                        options={allBarbers?.payload?.map(barber => ({
                          value: barber._id,
                          label: barber.first_name,
                        }))}
                        onChange={onSelectBarber}
                    />
                  </Form.Item>

                  <div className="flex justify-between items-center gap-6">
                    <Form.Item<Booking>
                        className="mb-2 w-full"
                        label="Start"
                        name="start"
                        rules={[{required: true, message: "Please select start time!"}]}
                    >
                      <Select
                          disabled={barberId === ""}
                          placeholder="Select statr time"
                          options={workTime.map(time => ({
                            value: time,
                            label: time,
                            disabled: checkAvailability(time, barberId, "start")
                          }))}
                      />
                    </Form.Item>

                    <Form.Item<Booking>
                        className="mb-2 w-full"
                        label="End"
                        name="end"
                        rules={[{required: true, message: "Please select end time!"}]}
                    >
                      <Select
                          disabled={barberId === ""}
                          placeholder="Select statr time"
                          options={workTime.map(time => ({
                            value: time,
                            label: time,
                            disabled: checkAvailability(time, barberId, "end")
                          }))}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item<Booking>
                      className="mb-2"
                      label="Service"
                      name="service"
                      rules={[{required: true, message: "Please select Service!"}]}
                  >
                    <Select
                        disabled={barberId === ""}
                        placeholder='Select service'
                        mode="multiple"
                        options={allService?.payload?.map(service => ({
                          value: service._id,
                          label: <div className="w-full flex justify-between">
                            <span>{service.name}</span>
                            <span>${service.price}</span>
                          </div>,
                        }))}
                        onChange={onSelectService}
                    />
                  </Form.Item>

                  <p className="text-[26px] font-semibold mb-2">$ {price}</p>

                  <Form.Item>
                    <Button className="w-full !bg-slate-500 !text-white active:scale-95 active:bg-slate-500"
                            htmlType="submit">
                      Send
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
  )
}
export default Booking
