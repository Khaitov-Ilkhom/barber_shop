import {Button, message} from "antd";
import {useArchivedUserMutation, useUnArchivedUserMutation} from "../../redux/api/usersApi.ts";
import {User} from "../../types";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Buttons = ({user} : {user : User}) => {
  const [role, setRole] = useState(null)
  const {token} = useSelector((state: RootState) => state.auth);

  const [archiveUserID, {
    isSuccess: archiveSuccess,
    isLoading: archiveLoading,
    isError: archiveError
  }] = useArchivedUserMutation()
  const [unArchiveUserID, {
    isSuccess: unArchiveSuccess,
    isLoading: unArchiveLoading,
    isError: unArchiveError
  }] = useUnArchivedUserMutation()

  const archivedUser = (user: User) => {
    if (user.archived) {
      unArchiveUserID({id: user._id})
    } else {
      archiveUserID({id: user._id})
    }
  }
  useEffect(() => {
    if (token) {
      const {role} = JSON.parse(atob(token?.split(".")[1]))
      setRole(role)
    }
  }, [token]);

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
  return (
      <div>
        <Button
            disabled={((role === "manager" && (user.role === "owner" || user.role === "manager")) || (role === "owner" && user.role === "owner")) || unArchiveLoading || unArchiveLoading}
            loading={archiveLoading || unArchiveLoading}
            onClick={() => archivedUser(user)}>{user.archived ? "UnArchived" : "Archived"}</Button>
      </div>
  )
}
export default Buttons
