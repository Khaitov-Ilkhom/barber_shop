import useSearchParamsHook from "../../../params-hook/paramsHook.ts";
import {
  useArchivedUserMutation,
  useChangeRoleMutation,
  useGetAllUsersQuery,
  useUnArchivedUserMutation
} from "../../../redux/api/usersApi.ts";

import {Button, message, Select, Table, TableColumnsType} from 'antd';
import {User} from "../../../types";
import {useEffect} from "react";

const AllUsers = () => {
  const {getParam} = useSearchParamsHook();
  const {data} = useGetAllUsersQuery({"user-status": getParam("user-status")})
  const [changeRole, {isSuccess, isError}] = useChangeRoleMutation()
  const [archiveUserID, {
    isSuccess: archiveSuccess,
    isLoading: archiveLoading,
    isError: archiveError
  }] = useArchivedUserMutation()
  const [unArchiveUserID, {
    isSuccess: unArchiveSuccess,
    isLoading: unarchiveLoading,
    isError: unArchiveError
  }] = useUnArchivedUserMutation()

  const onChange = (value: string, user: User) => {
    changeRole({id: user._id, newRole: value})
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const archivedUser = (user: User) => {
    if (user.archived) {
      unArchiveUserID({id: user._id})
    } else {
      archiveUserID({id: user._id})
    }
  }

  useEffect(() => {
    if (archiveSuccess) {
      message.success("Successfully archived user")
    }
    if (archiveError) {
      message.error("Error archived user")
    }
    if (unArchiveSuccess) {
      message.success("Successfully unarchived user")
    }
    if (unArchiveError) {
      message.error("Error unarchived user")
    }
  }, [archiveSuccess, archiveError, unArchiveSuccess, unArchiveError]);
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
          className="min-w-[100px]" showSearch
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
      render: (user) => <div>{
        user.archived ?
            <Button disabled={unarchiveLoading} loading={unarchiveLoading}
                    onClick={() => archivedUser(user)}>UnArchive</Button> :
            <Button disabled={archiveLoading} loading={archiveLoading}
                    onClick={() => archivedUser(user)}>Archive</Button>
      }
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
