import Banner from "@/components/Home/Banner";
import FeaturedPets from "@/components/Home/Featured";
import HowItWorks from "@/components/Home/HowItWorks";
import PetCareTips from "@/components/Home/PetCare";
import SuccessStories from "@/components/Home/Stories";
import WhyAdopt from "@/components/Home/WhyAdopt";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <FeaturedPets></FeaturedPets>
      <HowItWorks></HowItWorks>
      <WhyAdopt></WhyAdopt>
      <PetCareTips></PetCareTips>
      <SuccessStories></SuccessStories>
    </>
  );
}
