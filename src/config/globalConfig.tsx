export const limit = 10; 
export const radius = 500;
export const defaultQuery = "";
export const baseApiUrl = "https://liveapi-sandbox.yext.com/v2/accounts/me";
export const liveAPIKey = "426b3c5ef4e2e2f26b2bae43f419d470";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const savedFilterId = "1134081546";
export const entityTypes = "location";
export function slugify(slugString:any){
    slugString.toLowerCase().toString();
    slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/, "");
    slugString = slugString.replaceAll("  ", "-");
    slugString = slugString.replaceAll(" ", "-");
    slugString = slugString.replaceAll("---","-");
    slugString = slugString.replaceAll("--","-");
    slugString = slugString.replaceAll("'","");
    return slugString.toLowerCase();
};
export function slugify1(slugString:any){
    slugString.charAt(0,9).toUpperCase() + slugString.slice(1). toLowerCase().toString();
    slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@_]/, " ");
    slugString = slugString.replaceAll("_", " ");
    return slugString.charAt(0,9).toUpperCase()+ slugString.slice(1). toLowerCase().toString();
};
 export const defaultTimeZone = "Europe/London";
 export const AnalyticsEnableDebugging  = true;
 export const AnalyticsEnableTrackingCookie  = true;
export const googleMapsConfig =  {
    centerLatitude: 26.835960,
    centerLongitude: 75.815420,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"  
}; 

export const cookieText = `Our site and our partners collect data and use cookies in accordance with our`;
export const cookieText1 = `to enhance your experience, analyze traffic and for ad personalization and measurement. For more information on this and how to manage your cookies, please click cookie settings below.`
export const cookieUrl = "https://www.byredo.com/eu_en/cookie-policy"
export const ByredoSocialMediaUrls = {
    facebook : "https://www.facebook.com/byredo/",
    instagram: "https://www.instagram.com/officialbyredo/"
}

export const GoogleSearchConsole = { 
  name : "google-site-verification",
  content : "WIqhwAw2ugRAKEYRRqis1ZfUBbnWe_AXSoDltHceCbI"
}
export const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export const BaseUrl = "https://main-strongly--mushy--sole-sbx-pgsdemo-com.sbx.preview.pagescdn.com"
export const AnswerExperienceConfig =  {
    experienceKey: "byredo",
    locale:"en_GB",
    apiKey: "aeed4d912d9a2d74d399172c3b724f63",
    verticalKey: "locations",
    experienceVersion: "STAGING",
    sessionTrackingEnabled: true,
    endpoints:{
        universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
        verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
        questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
        universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
        verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
        filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch"
    }
};


