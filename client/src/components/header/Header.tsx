import {Link, NavLink, useNavigate} from "react-router-dom";
import {SlUser} from "react-icons/sl";
import {IoLogInOutline, IoLogOutOutline} from "react-icons/io5";
import {logOut} from "../../redux/slice/authSlice.ts";
import {Dropdown, Space} from "antd";
import {FaRegUserCircle} from "react-icons/fa";
import userLogo from "../../images/headerProfile.svg"

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const items = [
    {
      label:
          <div onClick={() => navigate("/profile")}
               className="bg-transparent flex items-center gap-2 text-[#596780]">
            <span>Profile</span> <SlUser/>
          </div>,
// : <div className="bg-transparent flex items-center gap-2 text-[#596780]">User not registered</div>,
      key: "0"
    },
    {
      label: <div onClick={() => navigate("/auth")}
                  className="bg-transparent flex items-center gap-2 text-[#596780]">
        <span>Sign in</span>
        <IoLogInOutline/>
      </div>,
      key: '1',
    },
    {
      label: <div onClick={() => logOut()} className="bg-transparent flex items-center gap-2 text-[#596780]">
        <span>Log Out</span>
        <IoLogOutOutline/>
      </div>,
      key: '3',
    }
  ];

  return (
      <div className="mx-auto w-full shadow-2xl p-4">
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center gap-6 px-6">
          <div>
            <Link className='text-[32px] text-[#B5AF93]' to="/">Barber Shop</Link>
          </div>
          <div>
            <ul className="flex justify-center items-center gap-4">
              <li className="text-[22px]"><NavLink to="/">Home</NavLink></li>
              <li className="text-[22px]"><NavLink to="/our-team">Our Team</NavLink></li>
              <li className="text-[22px]"><NavLink to="/gallery">Gallery</NavLink></li>
              <li>
                <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div className="pb-2 flex justify-center items-center">
                        {
                          token && token ? <img className="w-[45px] rounded-full" src={userLogo as string} alt="User logo"/> : <FaRegUserCircle
                              className="w-[40px] h-[40px] text-[#596780] rounded-full"
                          />
                        }
                      </div>
                    </Space>
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}
export default Header
