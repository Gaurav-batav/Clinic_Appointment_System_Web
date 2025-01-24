import React from "react";
import Button from "../layouts/Button";
import { RiMicroscopeLine } from "react-icons/ri";
import ServicesCard from "../layouts/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import Navbar from "./Navbar";

const Services = () => {
  const icon1 = (
    <RiMicroscopeLine size={35} className=" text-backgroundColor" />
  );
  const icon2 = (
    <MdHealthAndSafety size={35} className=" text-backgroundColor" />
  );
  const icon3 = <FaHeartbeat size={35} className=" text-backgroundColor" />;

  return (
    <>
    <Navbar />
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
        </div>
        <div className=" mt-4 lg:mt-0">
          <Button title="See Services" />
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-5 pt-14">
        <ServicesCard 
          icon={icon1} 
          title="Lab Test" 
          description="Access a wide range of reliable lab tests designed to give you accurate & timely results. From routine screenings to specialized diagnostics, we use advanced technology to ensure the best care for health." 
        />
        <ServicesCard 
          icon={icon2} 
          title="Health Check" 
          description="Stay proactive about your well-being with our comprehensive health check packages. Early detection and regular monitoring empower you to live a healthier, longer life.Healthy habits, and hassle-free health check-ups." 
        />
        <ServicesCard 
          icon={icon3} 
          title="Heart Health" 
          description="Prioritize your cardiovascular health with our dedicated heart screening services. From cholesterol profiling to advanced cardiac diagnostics.Heart health handled with high-quality healthcare and heartfelt care." 
        />
      </div>
    </div>
     </>
  );
};

export default Services;
