import {useGetAllServiceQuery} from "../../redux/api/servicesApi.ts";

const Category = () => {
  const {data} = useGetAllServiceQuery()

  return (
      <div className="max-w-[1440px] mx-auto w-full flex justify-around gap-4 my-6 px-6">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {
              data && data?.payload?.slice(0, 6).map(service =>
                  <div key={service._id} className=" flex justify-center items-center flex-col">
                    <img className="w-[130px] h-[130px] object-cover rounded-full shadow-2xl" src={service.image} alt=""/>
                    <p className="text-[24px] my-3">{service.name}</p>
                    <button
                        className="px-8 py-2 transition duration-300 active:scale-90 bg-black text-white rounded-xl text-[26px]">More
                    </button>
                  </div>
              )
          }
        </div>
      </div>
  )
}
export default Category
