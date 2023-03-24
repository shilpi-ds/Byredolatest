import * as React from "react";
import "../index.css";
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
import favicon from "../images/favicon.png";
import { svgIcons } from "../svg icons/svgIcon";
import Header from "../components/layouts/header";

import Footer from "../components/layouts/footer";
import BreadCrumbs from "../components/layouts/BreadCrumb";
import { slugify } from "../config/globalConfig";
import {
  AnswerExperienceConfig,
  googleMapsConfig,
  defaultTimeZone,
  GoogleSearchConsole,
  BaseUrl,
  regionNames,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../config/globalConfig";

var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "country",
    // filter: {
    //   savedFilterIds: [],
    // },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "address",

      "c_canonicalURL",
      "c_metaDescription",
      "c_metaTitle",
      "c_robotsTag",

      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.meta.entityType",

      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.meta.entityType",

      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.meta.entityType",

      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
   
    ],
    filter: {
      entityTypes: ["ce_country"],
      
    },
    localization: {
      locales: ["fr-FR","en_GB","it-IT","ja-JP","de-DE"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
 
  let url = "";

  let slugString = document.id + " " + document.name;
  //console.log(slugString,"sluggggg");
  let slug = slugify(slugString);

  if (typeof document.slug == "undefined") {

    let slugStrings: any = [];
    if (typeof document.dm_directoryParents != "undefined") {
      document.dm_directoryParents?.map((e: any, index: number) => {

        if (e.meta.entityType.id != "ce_root") {
          if (typeof e.slug == "undefined") {
            slugStrings.push(slugify(e.name));
          } else {
            slugStrings.push(e.slug);
          }
        }

      });
    }

    if (slugStrings.length > 0) {
      url = `${slugStrings.join("/")}${slug}`;
    } else {
      url = `${slug}`;
    }

  } 
   else {
     let slugStrings: any = [];

     if (typeof document.dm_directoryParents != "undefined") {
       document.dm_directoryParents?.map((e: any) => {

         if (e.meta.entityType.id != "ce_root") {
           if (typeof e.slug == "undefined") {
             slugStrings.push(slugify(e.name));
           } else {
             slugStrings.push(e.slug);
           }
        }

       });
     }

    if (slugStrings.length > 0) {
      url = `${slugStrings.join("/")}/${document.slug.toString()}`;
    } else {
      url = `${document.slug.toString()}`;
    }

   }
//console.log(url,"url")
  return document.meta.locale+"/"+url+".html";
  

};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,

}): HeadConfig => {

  let url = "";
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document?.slug?.toString()}.html`;
  }
  // <meta name="google-site-verification" content="WIqhwAw2ugRAKEYRRqis1ZfUBbnWe_AXSoDltHceCbI" />
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `${document.name} | Shop Byredos Collection of Perfumes, Candles, Makeup, Leather And Body Care. Free shipping & Free returns. Complimentary samples.`;
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `${document.name} | BYREDO Official Site | Perfumes, Candles & Body Care`;
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
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
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
          name: "author",
          content: "Byredo",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${
            document.c_robotsTag ? document.c_robotsTag : "noindex, nofollow"
          }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document.c_canonical ? document.c_canonical : BaseUrl + "/" + url
          }`,
        },
      },

      //og tag
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
          content: BaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${
            document.c_byradoLogo
              ? document.c_byradoLogo.image.url
              : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
          }`,
        },
      },
      //twitter tag
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
          name: "twitter:description",
          content: `${metaDescription}`,
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
          content: BaseUrl + "/" + url,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${
            document.c_byradoLogo
              ? document.c_byradoLogo.image.url
              : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
          }`,
        },
      },
    ],
  };
};

const Country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,

}) => {
  const { dm_directoryChildren, address, dm_directoryParents } = document;
  const { name, _site, slug } = document;

  let ce_cities: any = [];
  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
    let detlslug;
    var country: any = entity?.address?.countryCode?.toLowerCase();
    if (typeof entity.dm_directoryChildren != "undefined") {
      if (entity.meta.entityType.id !== 'ce_city') {              
        if (entity.dm_directoryChildrenCount == 1) {
          entity.dm_directoryChildren.map((res: any) => {

            let detlslug1 = "";

            if (!res.slug) {
              let slugString = res.id + " " + res.name;
              let slug = slugify(slugString);
              detlslug1 = `${slug}`;
            } else {
              detlslug1 = `${res.slug.toString()}`;
            }
            if (res.meta.entityType.id == 'ce_city') {
              detlslug1 = country+"/"+detlslug1;
            } else {
              detlslug1 = detlslug1;
            }

        

            res.dm_directoryChildren ? res.dm_directoryChildren.map((detl: any) => {

              if (!detl.slug) {
                let slugString = detl.id + " " + detl.name;
                let slug = slugify(slugString);
                detlslug1 = `${slug}`;
              } else {
                detlslug1 = `${detl.slug.toString()}`;
              }

              detlslug = detlslug1;

            }) : detlslug = detlslug1;


          })
        }
        else {
          let detlslug1 = "";

          if (!entity.slug) {
            let slugString = entity.id + " " + entity.name;
            let slug = slugify(slugString);
            detlslug1 = `${slug}`;
          } else {
            detlslug1 = `${entity.slug.toString()}`;
          }

          detlslug = slug + "/" + detlslug1;
        }
console.log(detlslug,"sluggggggggg");
        return (
          <li className=" storelocation-category">
            <a
              key={entity.slug}
              href={"/" +document.meta.locale+ "/" + detlslug+".html"}
            >
              {entity.name} ({entity.dm_directoryChildrenCount})
            </a>
          </li>
        )

      }else{
        ce_cities.push(entity);
      }

    }


  }) : null;
  var currentUrl = ""
  const myArray = path.split("/");
  currentUrl = myArray && myArray[1]
  //console.log(currentUrl,"CURRENT")
  const updatelocale = (locale: any) => {
    //console.log(locale,"test");
   return (window.location.pathname = `${locale}/${currentUrl}`);
  };
  
  /***
   * for city when not have region in locations
   * 
   */
  

  const citiesList = ce_cities.map((city: any) => {

    let cityslug = "";

    if(city.dm_directoryChildrenCount == 1){

      city.dm_directoryChildren ? city.dm_directoryChildren.map((location: any) => {

        if (!location.slug) {
          let slugString = location.id + " " + location.name;
          let slug = slugify(slugString);
          cityslug = `${slug}`;
        } else {
          cityslug = `${location.slug.toString()}`;
        }
      }) : "";
    
    }else{  
      if (!city.slug) {
        let slugString = city.id + " " + city.name;
        let slug = slugify(slugString);
        cityslug = `${slug}`;
      } else {
        cityslug = `${city.slug.toString()}`;
      }
      if (city.meta.entityType.id == 'ce_city') {
        cityslug = document.meta.locale+"/" + cityslug+".html";
      } 
   }

    return (
      <li className=" storelocation-category">
        <a
          key={city.slug}
          href={ "/" + cityslug}
        >
          {city.name} ({city.dm_directoryChildrenCount})
        </a>
      </li>
    )

  });

  return (
    <>
   <Header
            ByredoLogo={_site.c_byradoLogo}
            ByredoLinks={_site.c_headerMenus}
          />
      <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        address={address}
      ></BreadCrumbs>


      <div className="content-list">
        <div className="container">
          <ul className="region-list">
            {childrenDivs}
          </ul>
          {ce_cities.length > 0 ? (<><h2 className="sec-title text-center mt-5">{name}</h2><ul className="city-list region-list"> {citiesList}</ul></>) : ""}
        </div>
      </div>

      <Footer
            footerHelpSection={_site.c_footerHelpSection}
            servicesFooter={_site.c_servicesFooter}
            footerStoreLocator={_site.c_footerStoreLocator}
            customerCare={_site.c_customerCare}
            phone={_site.mainPhone}
            emailAddress={_site.c_emailAddress}
            path={updatelocale}
            _site={_site}
          />

    </>
  );
};

export default Country;
