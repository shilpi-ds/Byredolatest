import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
var style = {
  width: "310px",
  height: "310px",
};

const PhotoSlider = (props: any) => {
  const { photos, height, width,photoGalleryTitle} = props;  

  const photo = photos?.map((element:any) => (     
    
	<SplideSlide>
    <div className="relative">
       <img height={height} width={width} src={element?.image?.url} alt=""/>
    <div className="bottom-left absolute bottom-2 left-2 font-semibold text-xl"> {element.description}</div>
   </div>
   
	</SplideSlide>    
  ));
  var desktopSliderType: string = "";
  var tabSliderType: string = "";
  var mobileSliderType: string = "";
  
  var desktopSliderCenter: string = "";
  var tabSliderCenter: string = "";
  var mobileSliderCenter: string = "";
    let length = photos?.length;
    desktopSliderType = length > 4 ? "loop" : "slide";
  
    tabSliderType = length > 2 ? "loop" : "slide";
  
    mobileSliderType = length > 1 ? "loop" : "slide";
  
    desktopSliderCenter = length > 4 ? "" : "center-4";
  
    tabSliderCenter = length > 2 ? "" : "center-2";
  
    mobileSliderCenter = length > 1 ? "" : "center-1";
  return (
    <>
      <h2 className="text-4xl text-center font-medium mt-8 mb-6">{photoGalleryTitle}</h2>
	  <Splide options={{
                rewind: false,
                type: desktopSliderType,
                perPage: 4,
                perMove: 1,
                arrows: true,
                drag: false,
                pagination: false,
                lazyLoad: "nearby",
                breakpoints: {
                  1279: {
                    perPage: 2,
                    drag: true,
                    pagination: true,
                    type: tabSliderType,
                  },
                  575: {
                    perPage: 1,
                    padding: "45px",
                    type: mobileSliderType,
                  },
                },
              }}>
          {photo}
      </Splide>
    </>
  );
};

export default PhotoSlider;