import React from "react";

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/background/background-forest.jpg')" }}
    >
      <div className="bg-dark-gradient h-full w-full">{children}</div>
    </div>
  );
};

export default BackgroundImage;
