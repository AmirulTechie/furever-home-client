import Navbar from "@/components/Home/NavBar";
import Footer from "@/components/Shared/Footer";

export default function MainLayout({ children }) {
  return (
    <>
    <Navbar></Navbar>
      {children}
    <Footer></Footer>
    </>
  );
}