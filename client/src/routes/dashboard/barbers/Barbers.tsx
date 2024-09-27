import {Table, TableColumnsType} from "antd";
import {useGetAllBarbersQuery} from "../../../redux/api/barbersApi.ts";


const Barbers = () => {
  const {data} = useGetAllBarbersQuery()

  const columns: TableColumnsType = [
    {
      title: 'Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Chinese Score',
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
  ];

  return (
      <div>
        <Table columns={columns} dataSource={data?.payload?.map(user => ({key: user._id, ...user}))}/>
      </div>
  )
}
export default Barbers
