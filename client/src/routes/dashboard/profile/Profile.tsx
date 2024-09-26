import {useGetProfileQuery} from "../../../redux/api/authApi.ts";

const Profile = () => {
  const {data} = useGetProfileQuery()
  const user = data?.payload

  return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-800 p-4">
          <h2 className="text-white text-2xl font-bold">{user?.first_name} {user?.last_name}</h2>
          <p className="text-gray-400">{user?.role}</p>
        </div>
        <div className="p-6">
          <p className="text-gray-600">
            <span className="font-bold">Phone: </span>{user?.phone}
          </p>
        </div>
      </div>
  )
}
export default Profile
