import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-neutral-800 py-6 px-5">
      <div className="container mx-auto flex w-full justify-center items-center">
        <p className="text-neutral-300 text-center font-medium text-sm">      
          &copy; {currentYear} Real Estate. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
