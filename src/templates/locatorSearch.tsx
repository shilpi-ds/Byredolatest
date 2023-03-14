import * as React from "react";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import "../types/i18n.tsx";
import "../index.css";
import {
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import {
  SearchHeadlessProvider,
  useSearchActions,
} from "@yext/search-headless-react";
import Header from "../components/layouts/header";
import { JsonLd } from "react-schemaorg";
import favicon from "../images/favicon.png";
import SearchLayout from "../components/locatorPage/SearchLayout";
import { AnswerExperienceConfig, slugify,GoogleSearchConsole,BaseUrl,AnalyticsEnableDebugging,AnalyticsEnableTrackingCookie } from "../config/globalConfig";
import LocatorBread from "../components/locatorPage/LocatorBread";
import Banner from "../components/commons/LocatorBanner";
import Footer from "../components/layouts/footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";

export const config: TemplateConfig = {
  stream: {
    $id: "locatorSearch",
    filter: {
      entityIds: ["global-data"],
    },
    fields: [
      "id",
      "uid",
      "meta",

      /*Header*/
      "c_headerMenus",
      "c_byradoLogo",

      /*Footer*/
      "c_footerHelpSection",
      "c_servicesFooter",
      "c_footerStoreLocator",
      "c_customerCare",
      "mainPhone",
      "c_emailAddress",

      /*Seo*/
      "c_metaTitle",
      "c_metaDescription",
      "c_canonicalURL",
      "c_robotsTag",
    ],
    localization: {
      locales: ["en_GB","fr","ja","de","it"],
      primary: false,
    },
  },
};

// var url = "";
// export const getPath: GetPath<TemplateProps> = ({ document }) => {
//   if (!document.slug) {
//     let slugString = document.id + " " + document.name;
//     let slug = slugify(slugString);
//     url = `index.html`;
//   } else {
//     url = `${document.slug.toString()}.html`;
//   }
//   return url;
// };
// export const getPath: GetPath<TemplateProps> = () => {
//   return `index.html`;
// };

var url = "";
var currentUrl: any;
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  var name: any = document.name?.toLowerCase();
  var string: any = name?.toString();
  let result: any = string?.replaceAll(" ", "-");

  if (!document.slug) {
    currentUrl = `index.html`;
    url = `${document.meta.locale}/index.html`;
  } else {
    currentUrl = `${document.slug.toString()}.html`;
    url = `${document.meta.locale}/${document.slug.toString()}.html`;
  }

  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  // <meta name="google-site-verification" content="WIqhwAw2ugRAKEYRRqis1ZfUBbnWe_AXSoDltHceCbI" />
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `${document.name} | Shop Byredos Collection of Perfumes, Candles, Makeup, Leather And Body Care. Free shipping & Free returns. Complimentary samples.`;
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `${document.name} - Stores in Everyone`;

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
          content: "Well Pharma",
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
              : BaseUrl
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
          content: BaseUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${document.c_byradoLogo ? document.c_byradoLogo.image.url : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"}`,
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
          content: BaseUrl,
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
          content: `${document.c_byradoLogo ? document.c_byradoLogo.image.url : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"}`,
        },
      },
     ],
  };
};
const locatorSearch: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  __meta,
  document,
}) => {
  const { _site } = document;
  let templateData = { document: document, __meta: __meta };

  const providerOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  
  const { t, i18n } = useTranslation();
  i18n.changeLanguage(`${document.meta.locale}`);
  var currentUrl = ""
  const myArray = path.split("/");
  currentUrl = myArray && myArray[1]
  const updatelocale = (locale: any) => {
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };

  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Byredo",
          url: "https://www.byredo.com/eu_en/",
          logo: `${document.c_byradoLogo ? document.c_byradoLogo.image.url : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"}`,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name={""}>
      <Header
        ByredoLogo={_site.c_byradoLogo}
        ByredoLinks={_site.c_headerMenus}
      />

      <Banner
        BannerImage={_site.c_bannerImage}
        Title={_site.c_bannerTitle}
        Description={_site.c_bannerDescription}
      />
      <LocatorBread />
      <SearchHeadlessProvider
        experienceKey={AnswerExperienceConfig.experienceKey}
        locale={AnswerExperienceConfig.locale}
        apiKey={AnswerExperienceConfig.apiKey}
        verticalKey={AnswerExperienceConfig.verticalKey}
        experienceVersion={AnswerExperienceConfig.experienceVersion}
        sessionTrackingEnabled={AnswerExperienceConfig.sessionTrackingEnabled}
        endpoints={AnswerExperienceConfig.endpoints}
      >
        <SearchLayout />
      </SearchHeadlessProvider>
      <Footer
        footerHelpSection={_site.c_footerHelpSection}
        servicesFooter={_site.c_servicesFooter}
        footerStoreLocator={_site.c_footerStoreLocator}
        customerCare={_site.c_customerCare}
        phone={_site.mainPhone}
        emailAddress={_site.c_emailAddress} path={updatelocale}
      />
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default locatorSearch;
