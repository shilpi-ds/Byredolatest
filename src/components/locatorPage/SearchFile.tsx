import * as React from "react";
import FilterAwesome from "../locatorPage/Filter";
import { useSearchActions,useSearchState} from "@yext/search-headless-react";
import {useState } from 'react';
import {  AnswerExperienceConfig, googleMapsConfig, limit } from "..//../config/globalConfig";
import Geocode from "react-geocode";
import { useTranslation } from "react-i18next";
import FilterSearch from "../locatorPage/FilterSearch";
import useFetchResults from "../../hooks/useFetchResults";
import { svgIcons } from "../../svg icons/svgIcon";
import LoadingSpinner from "../commons/LoadingSpinner";
var mapzoom = 8;
const Herobanner = (props:any) => {
    const [isLoading, setIsloading] = React.useState(true);
    const [zoomlevel, setZoomlevel] = React.useState(7);
    const [centerLatitude, setCenterLatitude] = useState(
      googleMapsConfig.centerLatitude
    );
    const [centerLongitude, setCenterLongitude] = useState(
      googleMapsConfig.centerLongitude
    );
    const [active, setActive] = useState("");
    const locationResults = useFetchResults() || [];
    const alternateResult =useSearchState((s) => s.vertical.noResults?.allResultsForVertical.results
      ) || [];
    const [optiontext, setOptiontext] = useState("");
    const [check, setCheck] = useState(false);
    const [inputvalue, setInputValue] = React.useState("");
    const [allowlocation, setallowLocation] = React.useState("");
    const [userShareLocation, setUserShareLocation] = useState(false);
    const [offset, setOffset] = React.useState(0);
    const searchActions = useSearchActions();
    const [optionclick, setOptionClick] = useState(true);
    var searchKey: any;
    var firstTimeRunners = true;
  const onClick = () => {
    setZoomlevel(3);
    setInputValue("");

    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation("Please allow your Location");
        }
        setUserShareLocation(false);
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              if (response.results[0]) {
                setInputValue(response.results[0].formatted_address);
    
                document
                  .getElementsByClassName("FilterSearchInput")[0]
                  .setAttribute("value", response.results[0].formatted_address);
                setallowLocation("");
                searchActions.setUserLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              }
            },
            (error: any) => {
              console.error(error);
              setCheck(false);
            }
          );
          setCenterLatitude(position.coords.latitude);
          setCenterLongitude(position.coords.longitude);

          searchActions.setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          searchActions.setVertical(AnswerExperienceConfig.verticalKey);
          // searchActions.setQuery(response.results[0].formatted_address);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };


  const Findinput = () => {
    let searchKey = document.getElementsByClassName("FilterSearchInput");
    let Search = searchKey[0].value;
    searchActions.setOffset(0);
    if (Search.length) {
      setInputValue("");
      getCoordinates(Search);
    }
  };

  const handleInputValue = () => {
    setInputValue('');
  }
  const handleSetUserShareLocation = (value: any, userShareStatus: boolean) => {
    // console.log('handleSetUserShareLocation', value, userShareStatus);
    setInputValue(value);
    if (!userShareStatus) {
      setCenterLatitude(googleMapsConfig.centerLatitude);
      setCenterLongitude(googleMapsConfig.centerLongitude);
    }
  };


  function getCoordinates(address: string) {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          data.results.map((res: any) => {
            const userlatitude = res.geometry.location.lat;
            const userlongitude = res.geometry.location.lng;
            let params = { latitude: userlatitude, longitude: userlongitude };
            setCenterLatitude(userlatitude);
            setCenterLongitude(userlongitude);
            searchActions.setQuery(address);
            searchActions.executeVerticalQuery();
          });
        } else {
          searchActions.setUserLocation({
            latitude: centerLatitude,
            longitude: centerLongitude,
          });
          searchActions.setQuery(address);
          searchActions.executeVerticalQuery();
        }
      });
  }


  const { t, i18n } = useTranslation();
  return (
    <>
       <div className="search-block">
            {allowlocation.length > 0 ? (
              <div className="for-allow">{t("Please allow your Location")}</div>
            ) : (
              ""
            )}

            <div className="location-with-filter">
              <h3 className="title">{t("Enter a Town or Postcode")}</h3>

              {/* Use My Location button */}
              <button
                className="ghost-button before-icon"
                title="Search using your current location!"
                id="useLocation"
                onClick={onClick}
              >
                {svgIcons.useMyLocation}
            {t("Use my location")}
              </button>
            </div>

            {/* Search Input by name,address  */}
            <div className="search-form">
              <FilterSearch
                customCssClasses={{
                  filterSearchContainer: "mb-0",
                  inputElement: "FilterSearchInput",
                  optionsContainer: "options",
                }}
                inputvalue={inputvalue}
                searchOnSelect={false}
                searchFields={[
                  {
                    entityType: "location",
                    fieldApiName: "name",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.line1",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.line2",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.city",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.postalCode",
                  },
                ]}
                handleInputValue={handleInputValue}
                handleSetUserShareLocation={handleSetUserShareLocation}
              />
              <div className="flex justify-between"> 
              {/* Filter */}
              <FilterAwesome
                customCssClasses={{ container: "filter-items" }}
                defaultExpanded={true}
              ></FilterAwesome></div>
             
              {/* Search icon Button  */}
              <button
                className="button"
                aria-label="Search bar icon"
                id="search-location-button"
                onClick={Findinput}
              >
                {svgIcons.Searchbaricon}
              </button>
            </div>
          </div>


    </>
  )
}
export default Herobanner;