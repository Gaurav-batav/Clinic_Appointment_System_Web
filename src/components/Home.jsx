import React from "react";
import Navbar from "./Navbar";
import About from "./About";
import Doctors from "./Doctors";
import Services from "./Services";
import Blogs from "./Blogs";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
    <Navbar />
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/home.png')] bg-no-repeat bg-cover opacity-90">
      <div className=" w-full lg:w-4/5 space-y-5 mt-10">
        <h1 className="text-5xl font-bold leading-tight">
          We Take Care About Your Health..
        </h1>
        <p>
        The best of modern healthcare to ensure you stay healthy, always.
        </p>

      </div>
    </div>
    <About/>
    <Doctors/>
    <Services/> 
    <Blogs/>   
    <Footer/>
    </>
  );
};

export default Home;
