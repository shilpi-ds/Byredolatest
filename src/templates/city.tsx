import * as React from "react";
import getDirectionUrl from "../components/commons/GetDirection";
//import constant from "../constant";
import favicon from "../images/favicon.png"
import Header from "../components/layouts/header";
import Banner from "../components/commons/LocatorBanner";
import Footer from "../components/layouts/footer";
import BreadCrumbs from "../components/layouts/BreadCrumb";

import OpenCloseStatus from "../components/commons/OpenCloseStatus";
import {
  AnswerExperienceConfig,
  googleMapsConfig,
  defaultTimeZone,
  GoogleSearchConsole,
  BaseUrl,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../config/globalConfig";

import "../index.css";
var currentUrl = "";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import loc3 from "../images/loc3.svg";
import loc1 from "../images/loc1.svg";
import loc2 from "../images/loc2.svg";

import {stagingBaseurl} from "../config/answersHeadlessConfig";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import PageLayout from "../components/layouts/PageLayout";

import OpenClose from "../components/commons/openClose";
import timesvg from "../images/loc3.svg";

import { Link } from "@yext/pages/components";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "johnlewis-city",
    filter: {
      entityTypes: ["ce_city"],
      
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate"
    ],
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url: any = ""
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`
    }
  })
  return url;
};



export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  let metaDescription = document.c_metaDescription
  ? document.c_metaDescription
  : `${document.name} | Shop new season trends in homeware, furniture and fashion at John Lewis & Partners. Discover the latest beauty products and browse must-have electricals, including iPads and TVs. Find gifts and much more at johnlewis.com.`;
let metaTitle = document.c_metaTitle
  ? document.c_metaTitle
  : `${document.name} - John Lewis & Partners | Homeware, Fashion, Electricals & More`;

return {
  title: metaTitle,
  charset: "UTF-8",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
  tags: [
    {
      type: "meta",
      attributes: {
        name: GoogleSearchConsole.name,
        content: GoogleSearchConsole.content,
      },
    },
    {
      type: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        href: favicon,
      },
    },

    {
      type: "meta",
      attributes: {
        name: "description",
        content: `${metaDescription}`,
      },
    },
    {
      type: "meta",
      attributes: {
        name: "author",
        content: "John Lewis",
      },
    },

    {
      type: "meta",
      attributes: {
        name: "robots",
        content: `${
          document._site.c_robotsTag
            ? document._site.c_robotsTag
            : "noindex, nofollow"
        }`,
      },
    },

    {
      type: "link",
      attributes: {
        rel: "canonical",
        href: `${
          document.c_canonical
            ? document.c_canonical
            : stagingBaseurl
        }`,
      },
    },
    // og tags
    {
      type: "meta",
      attributes: {
        property: "og:title",
        content: `${metaTitle}`,
      },
    },
    {
      type: "meta",
      attributes: {
        property: "og:description",
        content: `${metaDescription}`,
      },
    },
    {
      type: "meta",
      attributes: {
        property: "og:url",
        content: stagingBaseurl,
      },
    },

    {
      type: "meta",
      attributes: {
        property: "og:image",
        content: `${favicon}`,
      },
    },
    // twitter tag
    {
      type: "meta",
      attributes: {
        property: "twitter:title",
        content: `${metaTitle}`,
      },
    },
    {
      type: "meta",
      attributes: {
        name: "twitter:card",
        content: "summary",
      },
    },
    {
      type: "meta",
      attributes: {
        name: "twitter:url",
        content: stagingBaseurl,
      },
    },

    {
      type: "meta",
      attributes: {
        name: "twitter:description",
        content: `${metaDescription}`,
      },
    },

    {
      type: "meta",
      attributes: {
        name: "twitter:image",
        content: `${favicon}`,
      },
    },
   ],
};
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    slug,
    dm_directoryParents,
    dm_directoryChildren,
    c_globalData,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    _site,

  } = document;
 
  var sortedChildren = dm_directoryChildren?.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  let slugString = "";
  document?.dm_directoryParents?.forEach((e: any) => {
    slugString += e.slug + "/";
  });

  const childrenDivs = dm_directoryChildren?.map((entity: any) => {
   // console.log(entity)
    var origin: any = null;
    if (entity?.address?.city) {
      origin = entity?.address?.city;
    } else if (entity?.address?.region) {
      origin = entity?.address?.region;
    } else {
      origin = entity?.address?.country;
    }
    // let key: any = Object.keys(entity.hours)[0];
    var url = "";
    var address=entity?.address;
    var country: any = entity?.address?.countryCode?.toLowerCase();
    var name: any = entity?.name?.toLowerCase();
    var region: any = entity?.address?.region?.toLowerCase();
    var initialregion: any = region?.toString();
    var finalregion: any = initialregion?.replaceAll(" ", "-");
    var city: any = entity?.address?.city?.toLowerCase();
    var initialrcity: any = city?.toString();
    var finalcity: any = initialrcity?.replaceAll(" ", "-");
    
    var string: any = name?.toString();;
    //let result: any = string.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
    let result:any=string?.replace(/\s+/g,"-");
    if (!entity.slug) {
      url = "/" +country + "/" + finalregion + "/" + finalcity +
      "/" +
      entity.id+"-"+result +
      ".html";
    } else {
      url = "/" +country + "/" + finalregion + "/" + finalcity +
      "/" +
      entity.slug?.toString() +
      ".html";
    }

   


    return (

      <div className="bg-white shadow-lg w-[21.875rem] box_shadow drop-shadow-md">
                {/* <p className="text-center">Near by stores</p> */}

        <div className="flex justify-between items-center pt-3 ml-4">
            <h5 className="underline underline-offset-8 font-bold"><Link className="inline-block notHighlight" href={url}
                data-ya-track={`${entity.name}`}
                eventName={`${entity.name}`}
                rel="noopener noreferrer">{entity.name}</Link></h5>
                {/* {typeof location.distance != "undefined" ? <p className="pr-4 text-xs">{metersToMiles(location.distance)} miles</p>: ''} */}
        </div>

        <div className="flex mt-4 ml-4">
            <img className="h-[25px]" src={loc1} alt=""/>
            <div className="pl-4"><Address address={entity.address} /></div>
          
        </div>

        <div className="flex mt-4 ml-4">
            <img className="h-[25px]" src={loc2} alt=""/>
            <p className="text-sm pl-4"><a  href={`tel:${entity.mainPhone}`}>{entity.mainPhone}</a></p>

        </div>
        {entity.hours?
        <div className="flex mt-4 ml-4">
            <img className="h-[25px]" src={loc3} alt=""/>
            <p className="text-sm pl-4"><OpenCloseStatus timezone={entity.timezone} hours={entity.hours} deliveryHours={entity.hours}/></p>
        </div>
        :<div className="closeddot notHighlight red-dot">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
    <circle id="Ellipse_5" data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f"/>
    </svg>
           <div className="hours-info text-lg font-second-main-font closeddot"> 
           Closed
           </div>
           </div>
    }
        <div className="mt-[1.375rem] flex justify-center gap-2 pb-6">
            <button className="text-white text-sm py-1 bg-black w-[8.75rem]"><GetDirectionloc buttonText="Shop Directions" address={entity.address} latitude={entity.displayCoordinate ? entity.displayCoordinate.latitude : entity.yextDisplayCoordinate.latitude} longitude={entity.displayCoordinate ? entity.displayCoordinate.longitude : entity.yextDisplayCoordinate.longitude} />
            </button>
            <button className="text-white text-sm py-1 bg-black w-[8.75rem]"><Link className="btn" href={url}
                data-ya-track={`viewstore-${entity.name}`}
                eventName={`viewstore-${entity.name}`}
                rel="noopener noreferrer">
                 {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                 View Details</Link></button>
        </div>
    </div>

    
  );
  });
 

  var url: any = ""

  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug?.toString()}.html`
    }
  })
  let breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents?.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${stagingBaseurl}${i.slug}`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${stagingBaseurl}/${document.slug?.toString()}.html`,
      name: document.name,
    },
  });
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Matalan",
          //   url: _site.c_canonical,
          // logo: `${document.c_ogImage ? document.c_ogImage.map((result:any)=>{return result.url}) : ""}`
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <Header logo={_site.c_johnLogo} links={_site.c_headerMenus} topmenu={_site.c_headerTopMenus} free={_site.c_freeDelivery}/>
        <BreadCrumbs
          name={name}
          address={dm_directoryChildren.address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs>
 <HeaderBanner title={_site.c_bannerTitle} description={_site.c_bannerDescription} himage={_site.c_bannerImage.image.url} blabel={_site.c_bannerUrl.label} burl={_site.c_bannerUrl.link}/>

        <div className="content-list city-page">
          <div className="container mx-auto">
            <div className="sec-title">
              <h2>
              John Lewis Stores in {name}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem] gap-12">
              {childrenDivs}
            </div>
          </div>
        </div>
        <Footer footer1={_site.c_footer1Cta} footer1title={_site.c_footer1Title} footer1description={_site.c_footer1Description} footer2={_site.c_footer2} footer3title={_site.c_footer3Title} footer3cta={_site.c_footer3Cta}
 footer3barcta={_site.c_footer3BarcodeCta} footer3barimg={_site.c_footer3Barcode} footer4links={_site.c_footer4Links} footer4title={_site.c_footer4Title} footer4Description={_site.c_footer4Description} footer5img={_site.c_footer5Image}
 footer5cta={_site.c_footer5Cta} social={_site.c_socialFooter}/>
    </>
  );
};
export default City;