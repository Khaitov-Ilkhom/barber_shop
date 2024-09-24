import hero from "../../images/image 1.png"
import { FiMapPin } from "react-icons/fi";
import { FaPhoneVolume } from "react-icons/fa6";

const Hero = () => {
  return (
      <div className="max-w-[1440px] w-full mx-auto flex justify-center px-8 py-10 items-start gap-4">
        <div className="max-w-[560px] px-4">
          <h2 className="text-[46px]">WELCOME TO</h2>
          <p className="text-[64px] font-semibold">Barbershop in Manhattan </p>
          <p className="text-[64px] font-extrabold">New York</p>
          <ul>
            <li className="flex justify-items-start items-center gap-4 py-1"><FiMapPin/> <span>254 W 27ST ST, NEW YORK, NY 10011</span></li>
            <li className="flex justify-items-start items-center gap-4 py-1"><FaPhoneVolume/> <span>(212) 123-4567</span></li>
            <li className="flex justify-items-start items-center gap-4 py-1"><FiMapPin/> <span>341 W 11ST ST, NEW YORK, NY 10022</span></li>
            <li className="flex justify-items-start items-center gap-4 py-1"><FaPhoneVolume/> <span>(212) 123-4567</span></li>
          </ul>
          <div>
            <button>Book Online</button>
          </div>
        </div>
        <div className="max-w-[560px]">
          <img src={hero as string} alt="Hero image"/>
        </div>
      </div>
  )
}
export default Hero
