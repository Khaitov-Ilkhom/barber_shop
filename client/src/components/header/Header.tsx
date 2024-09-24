import {Link, NavLink} from "react-router-dom";

const Header = () => {
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
            </ul>
          </div>
        </div>
      </div>
  )
}
export default Header
