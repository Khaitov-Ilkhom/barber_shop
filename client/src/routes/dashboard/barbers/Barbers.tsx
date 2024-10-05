import {Table, TableColumnsType} from "antd";
import {useGetAllBarbersQuery} from "../../../redux/api/barbersApi.ts";

export const workTime : string[] = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const Barbers = () => {
  const {data} = useGetAllBarbersQuery()

  const columns: TableColumnsType = [
    {
      title: 'Firstname',
      dataIndex: 'first_name',
    },
    {
      title: 'Lastname',
      dataIndex: 'last_name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: "role",
      render: (role) => <span className="capitalize">{role}</span>
    },
    {
      title: "Work Time",
      render: () => <div>
        {
          workTime.map((time, index) =>
            <span className="text-blue-500" key={index}>{time} | </span>
          )
        }
      </div>
    }
  ];

  return (
      <div>
        <Table columns={columns} dataSource={data?.payload?.map(user => ({key: user._id, ...user}))}/>
      </div>
  )
}
export default Barbers
