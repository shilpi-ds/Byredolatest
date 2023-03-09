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
import Banner from "../components/commons/LocatorBanner";
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


/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "region",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.address"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_region"],
      
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url += i.slug + "/";
    }
  });
  url += document.slug.toString();

  return url + '.html';
};


// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };


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
    url = `${document.slug.toString()}.html`;
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

const region: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    slug,
    address,
   
    dm_directoryParents,
    dm_directoryChildren
  } = document;
  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
    let detlslug;

   // console.log(entity,"entity")
    if (typeof entity?.dm_directoryChildren != "undefined") {
    var country: any = entity?.address?.countryCode?.toLowerCase();
      if (entity?.dm_directoryChildrenCount == 1) {
        entity?.dm_directoryChildren?.map((res: any) => {
         //console.log(res,"res")
          let detlslug1 = "";
      
          var region: any = entity?.address?.region?.toLowerCase();
          var initialregion: any = region?.toString();
          var finalregion: any = initialregion?.replaceAll(" ", "-");
          if (!res.slug) {
            let slugString = res?.id+"-"+(res?.name.replace(/\s+/g,"-")).toLowerCase();
            let slugi = country+"/" +finalregion+"/"+ entity.slug + "/" + slugString;
            detlslug1 = `${slugi}.html`;
          } else {
            detlslug1 = `${res.slug.toString()}.html`;
          }

          detlslug = detlslug1;

        })
      } else {
        detlslug = country+"/" + slug + "/" + entity.slug + ".html";
      }

    }

    return (
      <li className=" storelocation-category">
        <a
          key={entity.slug}
         // href={stagingBaseurl  + detlslug}
         href={'/'  + detlslug}
        >
          {entity.name} ({entity.dm_directoryChildrenCount})
        </a>
      </li>
    )
  }) : null;

 

  
  return (
    <>
         <Header
            ByredoLogo={_site.c_byradoLogo}
            ByredoLinks={_site.c_headerMenus}
          />
       
  
<Banner
        BannerImage={_site.c_bannerImage}
        Title={_site.c_bannerTitle}
        Description={_site.c_bannerDescription}
      />
         <BreadCrumbs
          name={name}
          parents={dm_directoryParents}
          address={address}
        ></BreadCrumbs>

          <div className="content-list">
            <div className="container">
            <div className="sec-title">
                <h2 style={{ textAlign: "center" }}>
              {name}
                </h2>
              </div>
              <ul className="region-list">

                {childrenDivs}
              </ul>

            </div>
          </div>

          <Footer
            footerHelpSection={_site.c_footerHelpSection}
            servicesFooter={_site.c_servicesFooter}
            footerStoreLocator={_site.c_footerStoreLocator}
            customerCare={_site.c_customerCare}
            phone={_site.mainPhone}
            emailAddress={_site.c_emailAddress}
          />
    </>
  )
}
export default region;
