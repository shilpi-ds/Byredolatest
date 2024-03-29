import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../types/i18n";

const useUpdateTranslation = (data:any, locale:any) => {
    const { t, i18n } = useTranslation();
    i18n.addResource(locale, 'translation', 'use_my_location', data.c_useMyLocation); 
    i18n.addResource(locale, 'translation', 'Search_postcode_and_city', data.c_placeholderText);
    i18n.addResource(locale, 'translation', 'Enter_a_town_or_postcode', data.c_enterATownOrPostcode);
    i18n.addResource(locale, 'translation', 'Showing', data.c_showing);
    i18n.addResource(locale, 'translation', 'to', data.c_to);
    i18n.addResource(locale, 'translation', 'of', data.c_of);
    i18n.addResource(locale, 'translation', 'Results', data.c_results);
    i18n.addResource(locale, 'translation', 'view_station_detail', data.c_viewStationDetails);
    i18n.addResource(locale, 'translation', 'get_direction', data.c_getDirections);
    i18n.addResource(locale, 'translation', 'load_more', data.c_loadMore);
    i18n.addResource(locale, 'translation', 'nearby_Locations_Heading', data.c_nearbyLocationsHeading);
    i18n.addResource(locale, 'translation', 'store_information', data.c_storeInformation);
    i18n.addResource(locale, 'translation', 'Opening_Hours', data.c_openingHours);
    i18n.addResource(locale, 'translation', 'No_location_found', data.c_noLocationFound);
    i18n.addResource(locale, 'translation', 'view_more_location', data.c_viewMoreLocations);
    i18n.addResource(locale, 'translation', 'holiday_hours_calendar', data.c_holidayHoursCalendar);
    i18n.addResource(locale, 'translation', 'date', data.c_date);
    i18n.addResource(locale, 'translation', 'day', data.c_day);
    i18n.addResource(locale, 'translation', 'holiday_hours', data.c_holidayHours);
    i18n.addResource(locale, 'translation', 'temporarily_closed', data.c_temporarilyClosed);
    i18n.addResource(locale, 'translation', 'the_store_will_reopen_at', data.c_theStoreWillReopenAt);
    i18n.addResource(locale, 'translation', 'closed', data.c_closed);
    i18n.addResource(locale, 'translation', 'opensAt', data.c_opensAt);
    i18n.addResource(locale, 'translation', 'opens', data.c_opens);
    i18n.addResource(locale, 'translation', 'closesAt', data.c_closesAt);
    i18n.addResource(locale, 'translation', 'close', data.c_close);
    i18n.addResource(locale, 'translation', 'open', data.c_open);
    i18n.addResource(locale, 'translation', 'store_hours', data.c_storeHours);
   // i18n.addResource(locale, 'translation', 'Open_Closed_at', data.c_open);
    //i18n.addResource(locale, 'translation', 'Closed_Open_at', data.c_open);
    i18n.addResource(locale, 'translation', 'miles', data.c_miles);
    //i18n.addResource(locale, 'translation', 'headingPage', data.c_headingPage);
    //i18n.addResource(locale, 'translation', 'english', data.c_english);
   // i18n.addResource(locale, 'translation', 'french', data.c_french);
    i18n.addResource(locale, 'translation', 'Select Language', data.c_selectLanguage);
    i18n.addResource(locale, 'translation', 'Sunday', data.c_sunday);
   
  
};

export default useUpdateTranslation;