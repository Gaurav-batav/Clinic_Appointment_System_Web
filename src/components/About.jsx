import React from "react";
import img from "../assets/img/about.jpg";
import Navbar from "./Navbar";


const About = () => {
  return (
    <>
    <Navbar />
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
        As an integral part of improving patient access to care and chronic disease management and prevention, Wellness Infinite Hospital was Founded in 2017 and is currently based in Edgewood, Maryland. Wellness Infinite Hospital is serviced by Renee Fletcher a Board Certified Family Nurse Practitioner with a vast knowledge base of acute and chronic conditions. The main focus of this clinic is to ensure that each and every patient is given the individual attention that one deserves.
        </p>
        <p className="text-justify lg:text-start">
        Understanding the importance of including the whole person in disease management & prevention is the essential basis of care. This clinic recognized the many correlations exist between access to care and improved health outcomes and recognized that immediate change was needed!  
        </p>
        <p className="text-justify lg:text-start">
        As a family ran practice my husband and I plan to add patient quality service as a foundation thus appreciating every single patient that enters our practice. Patients are no longer just a number they are an important part of the Wellness Infinite Hospital Family.
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
    </>
  );
};

export default About;
