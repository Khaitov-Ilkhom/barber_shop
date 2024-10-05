import Header from "../../components/header/Header.tsx";
import ProfileComponent from "../../components/profile/ProfileComponent.tsx";
import {useGetProfileQuery} from "../../redux/api/authApi.ts";

const Profile = () => {
  const {data} = useGetProfileQuery()

  return (
      <div>
        <Header/>
        <ProfileComponent data={data}/>
      </div>
  )
}
export default Profile
