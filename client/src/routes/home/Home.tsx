import Header from "../../components/header/Header.tsx";
import Hero from "../../components/hero/Hero.tsx";
import Category from "../../components/category/Category.tsx";
import WorkHours from "../../components/work-hours/WorkHours.tsx";
import OurPricing from "../../components/our-pricing/OurPricing.tsx";

const Home = () => {
  return (
      <div className="w-full mx-auto">
        <Header/>
        <Hero/>
        <Category/>
        <WorkHours/>
        <OurPricing/>
      </div>

  )
}
export default Home
