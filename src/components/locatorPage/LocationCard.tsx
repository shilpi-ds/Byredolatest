import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from "../commons/hours";
import Address from "..//../components/commons/Address";
import getDirectionUrl from "../commons/GetDirection";
import { Link } from "@yext/pages/components";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import Phone from "../commons/phone";
import { svgIcons } from "../../svg icons/svgIcon";
import { Data } from "@react-google-maps/api";
import { slugify, defaultTimeZone  } from "../../config/globalConfig";

/**
 * 
 * @param meters 
 * @returns Distance in miles
 */
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationCard: CardComponent<Location> = ({ result }) => {
  const {
    address,
    id,
    hours,
    mainPhone,
    c_pharmacyServices,
    c_pharmacyServicesTitle,
    c_getDirections,
    c_bookAnAppointment,
    c_facilities,
  } = result.rawData;
  const [time, setTime] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");
  const formattedPhone = formatPhoneNumber(mainPhone);
  React.useEffect(() => {
    setTime(result.rawData);
    setTimeZone(result.rawData.timezone);
    if (!result.rawData) {
      setWithoutHourClass("withoutHours");
    }
    // getCurrentLocationLatLng();
  });


  /**
   * Function to convert Date format in dd-mm-yy
   */
  let a;
  let s;
  let dateNewFormat;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  if (hours?.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(hours?.reopenDate), a, " ");
    dateNewFormat = s;
  }


  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  };

  /**
   Note-  Url returns Slug
   * If slug is available then url returns Slug otherwise it returns id-name
   */
  var url = "";
  if (!result.rawData.slug) {
    let slugString = result.rawData?.id + "-" + result.rawData?.name;
    let slug = slugify(slugString);
    url = `${slugString}.html`;
  } else {
    url = `${result.rawData.slug.toString()}.html`;
  }

  

  /**
   * LocationCard component which returns the HTML of Locator Page Listing.
   */
  return (
    <div
      className={`location result-list-inner-${result.index} result onhighLight`}
       //data-id={`result-${result.id || result.index}`}
    >
      <div className="miles-with-title">
        <h3 className="onhighLight">
          <Link href={`${url}`}>{result.rawData.name} </Link>
        </h3>
        <p className="miles">{metersToMiles(result.distance ?? 0)} miles</p>
      </div>

      <Address address={address} />
      {mainPhone ? <Phone phone={mainPhone} /> : ""}
      {hours ? (
        <>
          {Object.keys(result.rawData.hours).length > 0 ? (
            <>
              <div className="OpenCloseStatus icon-row">
                <div className="icon">{svgIcons.openclosestatus}</div>
                {hours && hours?.reopenDate ?
                <div>
                  <OpenCloseStatus
                        timezone={timezone ? timezone : defaultTimeZone}
                        hours={hours}
                  />
                    The Store will reopen at {dateNewFormat}
                </div>
                        
                :
                <Link
                className={timeStatus + "onhighLight "}
                href="javascript:void(0);"
                onClick={onOpenHide}
              >
                <OpenCloseStatus
                timezone={timezone ? timezone : defaultTimeZone}
                hours={hours}
        />
          </Link>}

                <div className={timeStatus + " daylist"}>
                  <Hours hours={hours ? hours : {}} 
                   timezone={timezone ? timezone : defaultTimeZone}/>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
     
        </>
      ) : (
        <></>
      )}
    


      <div className="buttons gap-y-[2px] sm:gap-y-2.5">
      <div className="ctaBtn">
          <Link className="onhighLight button before-icon" href={`${url}`}>
            VIEW DETAIL
          </Link>
        </div>
        <div className="ctaBtn">
          <Link
            data-ya-track="getdirections"
            eventName={`getdirections`}
            className="onhighLight direction button before-icon"
            onClick={() => getDirectionUrl(result.rawData)}
            href="javascript:void(0);"
            rel="noopener noreferrer"
            //conversionDetails={conversionDetails_direction}
          >
            {c_getDirections ? (
              <>
                {svgIcons.GetDirection}
                {c_getDirections}
              </>
            ) : (
              <>DIRECTIONS </>
            )}
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default LocationCard;
