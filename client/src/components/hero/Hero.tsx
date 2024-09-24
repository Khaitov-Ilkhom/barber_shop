import hero from "../../images/image 1.png"
import {FiMapPin} from "react-icons/fi";
import {FaPhoneVolume} from "react-icons/fa6";
import {Typewriter} from "react-simple-typewriter";

const Hero = () => {
  return (
      <div className="max-w-[1440px] w-full mx-auto flex justify-center px-8 py-10 items-start gap-4">
        <div className="max-w-[560px] px-4">
          <h2 className="text-[46px]">WELCOME TO</h2>
          <p className="text-[64px] font-semibold">Barbershop in Tashkent </p>
          <p className="text-[64px] font-extrabold underline mb-4">
            <Typewriter words={['Chilonzor', "Mirzo Ulug'bek", 'Sergeli']}
                        loop={5}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
            />
          </p>
          <ul>
            <li className="flex justify-items-start items-center gap-4 py-1"><FiMapPin/> <span>Tashkent, Chilonzor tumani, Qatortol, 1B</span>
            </li>
            <li className="flex justify-items-start items-center gap-4 py-1"><FaPhoneVolume/>
              <span>(212) 123-4567</span></li>
            <li className="flex justify-items-start items-center gap-4 py-1"><FiMapPin/> <span>Tashkent, Shayxontoxur tumani, Xadra, 1</span>
            </li>
            <li className="flex justify-items-start items-center gap-4 py-1"><FaPhoneVolume/>
              <span>(212) 123-4567</span></li>
          </ul>
          <div className="my-4">
            <button
                className="py-3 px-6 border border-[#B5AF93] rounded-xl active:scale-95 transition duration-200">Book
              Online
            </button>
          </div>
        </div>
        <div className="max-w-[560px]">
          <img src={hero as string} alt="Hero image"/>
        </div>
      </div>
  )
}
export default Hero
