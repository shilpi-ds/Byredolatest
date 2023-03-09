import * as React from "react";
type props = {
  BannerImage: any;
  Title: any;
  Description:any;
};
const Banner = (props: any) => {
  const { BannerImage, Title, Description } = props;
  return (
    <>
      <div className="hero mx-auto">
          <img
            className="heroBanner"
             src={BannerImage?.url ? BannerImage.url : "https://a.mktgcdn.com/p-sandbox/MwudZ3MdxtTHmW9Jz3gEAC5LcWcO6gj-8oVv77su3B8/3400x700.jpg"}
            alt="Banner Image"
          /> 
        <div className="hero-content">
          <h1>
            {Title ? Title : "Byredo"}
          </h1>
          <p className="text-xl">{Description ? Description : "Makeup Beauty Products Website"}</p>
        </div>
      </div>
    </>
  );
};
export default Banner;
