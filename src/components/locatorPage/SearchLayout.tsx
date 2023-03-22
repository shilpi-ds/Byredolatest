import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import * as React from "react";
import $ from "jquery";
import LoadingSpinner from "../commons/LoadingSpinner";
import { StandardFacets } from "@yext/search-ui-react";
import FilterAwesome from "./Filter";
import FilterSearch from "./FilterSearch";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import {
  AnswerExperienceConfig,
  googleMapsConfig,
  limit,
} from "..//../config/globalConfig";
import { useTranslation } from "react-i18next";
import Geocode from "react-geocode";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import useFetchResults from "../../hooks/useFetchResults";
import { svgIcons } from "../../svg icons/svgIcon";
import ViewMore from "./ViewMore";
import ResultsCount from "./ResultsCount";
import VerticalResults from "../VerticalResults";
import { Link } from "@yext/pages/components";

var mapzoom = 8;
const SearchLayout = (props: any): JSX.Element => {
  console.log('props', props)
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
  console.log('locationResults', locationResults)
  const alternateResult =
    useSearchState(
      (s) => s.vertical.noResults?.allResultsForVertical.results
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
  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
    }
    searchActions.setUserLocation({
      latitude: googleMapsConfig.centerLatitude,
      longitude: googleMapsConfig.centerLongitude,
    });
    searchActions.setVerticalLimit(limit);
    searchActions.setOffset(0);
    searchActions.executeVerticalQuery();
    mapzoom = 6;
    setTimeout(() => {
      setIsloading(false);
      $("body").removeClass("overflow-hidden");
    }, 3100);
  };



  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }

    if (isLoading) {
      $("body").addClass("overflow-hidden");
    }
  }, []);

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

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    setActive("");
  };
  //const loader = isLoading ? <LoadingSpinner /> : "";

  const { t, i18n } = useTranslation();
  return (
    <>
      {/* {loader} */}
      <div className="locator-full-width place-content-center">
        <div className="locator-container">


          {/* Map view and List View CTA in mobile responsive  */}
          <div className="mobile-btns">
            <Link
              className="button before-icon listBtn"
              href="javascript:void(0);"
              onClick={() => {
                document.body.classList.remove("mapView");
              }}
            >
              {svgIcons.listView} Store List
            </Link>
            <Link
              className="button before-icon mapBtn"
              href="javascript:void(0);"
              onClick={addClass}
            >
              {svgIcons.mapView} Map View
            </Link>
          </div>
        
          {/* Map Section  */}
          <div className="map-section">
            <GoogleMaps
              apiKey={googleMapsConfig.googleMapsApiKey}
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              defaultZoom={3}
              zoomLevel={zoomlevel}
              setZoomLevel={setZoomlevel}
              showEmptyMap={true}
              check={check}
            />
            <ViewMore
              className={"button view-more before-icon"}
              idName={"mobile-view-more-button"}
              buttonLabel={"Load More"}
            />
          </div>
          <ResultsCount/>
          {alternateResult && alternateResult.length > 0 && (
            <p className="pt-2 pb-3 text-lg text-center no-lc-err-msg">
              {t("No Locations Found")}
            </p>
          )}

          {/* Result listing Section  */}
          <div className="result-listing">
            <PerfectScrollbar className="result-list">
              {locationResults && locationResults.length > 0 && (
                <div className="scrollbar-custom">
                  <VerticalResults
                    displayAllOnNoResults={false}
                    CardComponent={LocationCard}
                    locationResults={locationResults}
                  />
                </div>
              )}
            </PerfectScrollbar>
            {locationResults && locationResults.length > 0 && (
              <ViewMore
                className={"button view-more before-icon"}
                idName={"listing-view-more-button"}
                buttonLabel={"Load More"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchLayout;
