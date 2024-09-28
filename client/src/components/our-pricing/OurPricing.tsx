const OurPricing = () => {
  return (
      <div className="max-w-[1440px] mx-auto w-full mb-8">
        <div>
          <h3 className="text-[55px] font-extrabold text-center mb-6">Our Pricing</h3>
        </div>
        <div className=" max-w-[1200px] mx-auto w-full flex justify-around items-start gap-8 text-[32px] font-extralight">
          <div className='px-6'>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Regular Haircut</span> <span className="text-[#B5AF93]">$34+</span>
            </p>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Haircut + Royal Shave</span> <span className="text-[#B5AF93]">$60+</span>
            </p>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Beard Trim Machine</span> <span className="text-[#B5AF93]">$23+</span>
            </p>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Haircut and Facial</span> <span className="text-[#B5AF93]">$50+</span>
            </p>
          </div>
          <div className='px-6'>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Royal Shave</span> <span className="text-[#B5AF93]">$35+</span>
            </p>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Haircut + Beard Trim</span> <span className="text-[#B5AF93]">$65+</span>
            </p>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Beard + Facial</span> <span className="text-[#B5AF93]">$55+</span>
            </p>
            <p className="flex justify-between items-center border-b py-2 border-gray-600 gap-[50px]">
              <span>Men’s Facial</span> <span className="text-[#B5AF93]">$25+</span>
            </p>
          </div>
        </div>
      </div>
  )
}
export default OurPricing