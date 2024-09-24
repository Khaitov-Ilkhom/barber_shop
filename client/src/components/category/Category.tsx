import one from "../../images/image 5.png"
import two from "../../images/image 6.png"
import three from "../../images/image 7.png"
import four from "../../images/image 8.png"

const Category = () => {
  return (
      <div className="max-w-[1440px] mx-auto w-full flex justify-around gap-4 my-6">
        <div className=" flex justify-center items-center flex-col">
          <img className="w-[130px]" src={one as string} alt=""/>
          <p className="text-[24px] my-3">Regular Haircut</p>
          <button className="px-8 py-2 transition duration-300 active:scale-90 bg-black text-white rounded-xl text-[26px]">More</button>
        </div>
        <div className=" flex justify-center items-center flex-col">
          <img className="w-[130px]" src={two as string} alt=""/>
          <p className="text-[24px] my-3">Men’s Facial</p>
          <button className="px-8 py-2 transition duration-300 active:scale-90 bg-black text-white rounded-xl text-[26px]">More</button>
        </div>
        <div className=" flex justify-center items-center flex-col">
          <img className="w-[130px]" src={three as string} alt=""/>
          <p className="text-[24px] my-3">Royal Shave</p>
          <button className="px-8 py-2 transition duration-300 active:scale-90 bg-black text-white rounded-xl text-[26px]">More</button>
        </div>
        <div className=" flex justify-center items-center flex-col">
          <img className="w-[130px]" src={four as string} alt=""/>
          <p className="text-[24px] my-3">Kids Haircut</p>
          <button className="px-8 py-2 transition duration-300 active:scale-90 bg-black text-white rounded-xl text-[26px]">More</button>
        </div>
      </div>
  )
}
export default Category
