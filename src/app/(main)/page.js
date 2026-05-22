import Banner from "@/components/Home/Banner";
import FeaturedPets from "@/components/Home/Featured";
import HowItWorks from "@/components/Home/HowItWorks";
import ImpactSection from "@/components/Home/ImpactSection";
import PetCareTips from "@/components/Home/PetCare";
import SuccessStories from "@/components/Home/Stories";
import PlatformTrust from "@/components/Home/TrustPillers";
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
      <ImpactSection></ImpactSection>
      <PlatformTrust></PlatformTrust>
    </>
  );
}
