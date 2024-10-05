import {Image, Table, TableColumnsType} from "antd";
import {AllBooking} from "../../types";

const Booking = ({data}: {data: AllBooking | undefined}) => {

  const renderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-500">Pending</span>
      case "completed":
        return <span className="text-green-500">Completed</span>
      case "canceled":
        return <span className="text-green-500">Canceled</span>
      default:
        return <span className="text-red-500">Error</span>
    }
  }

  const columns: TableColumnsType = [
    {
      title: 'Barber name',
      render: (booking) => <span>{booking?.barber?.first_name}</span>
    },
    {
      title: 'Barber phone',
      render: (booking) => <span>{booking?.barber?.phone}</span>
    },
    {
      title: 'Client name',
      render: (booking) => <span>{booking?.client?.first_name}</span>
    },
    {
      title: 'Client phone',
      render: (booking) => <span>{booking?.client?.phone}</span>
    },
    {
      title: 'Client image',
      render: (booking) => <Image className="max-w-[60px] rounded-xl" src={booking?.client?.avatar} alt="Client image"/>
    },
    {
      title: "Date",
      dataIndex: "date"
    },
    {
      title: "From to",
      render: (booking) => <div>
        <p>Start {booking?.start}</p>
        <p>End {booking?.end}</p>
      </div>
    },
    {
      title: "Status",
      render: (booking) => <div>
        {
          renderStatus(booking?.status)
        }
      </div>
    },
    {
      title: "Price",
      render: (booking) => <span>$ {booking?.price}</span>
    },
    {
      title: "Payment status",
      render: (booking) => <span>{booking?.paid ? "Paid" : "No paid"}</span>
    }
  ];

  return (
      <div className="px-4">
        <Table columns={columns} dataSource={data?.payload?.map(booking => ({key: booking._id, ...booking}))}/>
      </div>
  )
}
export default Booking
