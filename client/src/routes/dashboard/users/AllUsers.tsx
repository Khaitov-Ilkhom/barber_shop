import useSearchParamsHook from "../../../params-hook/paramsHook.ts";
import {useChangeRoleMutation, useGetAllUsersQuery,} from "../../../redux/api/usersApi.ts";
import {message, Select, Table, TableColumnsType} from 'antd';
import {User} from "../../../types";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import Buttons from "../../../components/buttons/Buttons.tsx";

const AllUsers = () => {
  const {getParam} = useSearchParamsHook();
  const {data} = useGetAllUsersQuery({"user-status": getParam("user-status")})
  const [changeRole, {isSuccess, isError}] = useChangeRoleMutation()
  const [role, setRole] = useState(null)
  const {token} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      const {role} = JSON.parse(atob(token?.split(".")[1]))
      setRole(role)
    }
  }, [token]);

  const onChange = (value: string, user: User) => {
    changeRole({id: user._id, newRole: value})
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully updated user role")
    }
    if (isError) {
      message.error("Updated role error")
    }
  }, [isSuccess, isError]);

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
      render: (user) => <Select
          className="min-w-[100px] capitalize" showSearch
          disabled={(role === "manager" && (user.role === "owner" || user.role === "manager")) || (role === "owner" && user.role === "owner")}
          placeholder={user.role} optionFilterProp="label"
          onChange={(value) => onChange(value, user)} onSearch={onSearch}
          options={[
            {
              label: "User",
              value: "user"
            },
            {
              label: "Barber",
              value: "barber"
            },
            {
              label: "Manager",
              value: "manager"
            }
          ]}
      />
    },
    {
      title: 'Archived',
      render: (user) => <div>
        <Buttons user={user}/>
      </div>
    },
  ];

  return (
      <div>
        <Table columns={columns} dataSource={data?.payload?.map(user => ({key: user._id, ...user}))}/>
      </div>
  )
}
export default AllUsers
