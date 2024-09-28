const WorkHours = () => {
  return (
      <div className="max-w-[1440px] mx-auto w-full bg-image my-14">
        <div className="w-full flex justify-center items-center pt-[250px]">
          <div className="text-white max-w-[550px] px-8">
            <h3 className="text-[50px] font-extrabold">Why choose us?</h3>
            <p className="text-[22px] font-semibold">In addition, there 5 more reasons why men prefer Manhattan Barbershop N.Y.C:</p>
            <ul className="p-4">
              <li>Always welcoming environment</li>
              <li></li>
              <li>Our masters focus on the quality</li>
              <li></li>
              <li>We value both the time and the money of our clients</li>
              <li></li>
              <li>We work only with high-quality, hypoallergenic premium products</li>
              <li></li>
              <li>All surfaces and tools are cleaned, disinfected before and after using</li>
            </ul>
          </div>
          <div className="max-w-[500px] w-full bg-white rounded-2xl px-8 pt-6 pb-4 text-center">
            <div>
              <h3 className="text-[40px] font-extrabold text-[#B5AF93] py-4">WORKING HOURSE</h3>
              <div className="text-[22px] font-extralight">
                <p>SUNDAY 10 AM – 5 PM</p>
                <p>MONDAY 9 AM – 7PM</p>
                <p>TUESDAY 8AM – 8PM</p>
                <p>WEDNESDAY 8AM – 8PM</p>
                <p>THURSDAY 8AM – 8PM</p>
                <p>FRIDAY 8AM – 7PM</p>
                <p>SATURDAY 9AM – 6PM</p>
              </div>
              <button
                  className="py-3 px-6 border border-[#B5AF93] rounded-xl active:scale-95 transition duration-200 my-6">Book
                Online
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
export default WorkHours
