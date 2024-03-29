import * as React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { cookieText, cookieText1, cookieUrl } from "../../config/globalConfig";
import LocalesDropdown from "../../components/commons/LanguageDropdown";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";
import RtfConverter from "@yext/rtf-converter";
type props = {
  footerHelpSection: any;
  servicesFooter: any;
  footerStoreLocator: any;
  customerCare: any;
  emailAddress: any;
  path:any;
};
const Footer = (props: any) => {
  const {
    footerLogos,
    copyrightText,
    footerLogo,
    emailAddress,
    footerHelpSection,
    servicesFooter,
    footerStoreLocator,
    customerCare,
    phone,
    path,_site
  } = props;
console.log(_site,"siteeeeeeeee");
// if (_site.c_cookieText) {
//   var Desc = RtfConverter.toHTML(_site.c_cookieTex);
// }
  return (
    <>
      <div className="subfooter-sec">
        <div className="container-lg">
          <div className="subfooter-inner">
            <div className="subfooter-links">  
              <ul>
              <li><LocalesDropdown updatelocale={path} country={_site.c_countryFooter}/></li>
                <li className="text-xl pb-4">{customerCare}</li>
                <li className="location-phone ">
                  <Link
                    className="phone-number"
                    data-ya-track="phone"
                    href={`tel:${phone}`}
                    rel="noopener noreferrer"
                  >
                    {phone}
                  </Link>
                </li>
                {emailAddress?.link && emailAddress?.label && (
                  <li className="location-phone ">               
                    <Link
                      className="link-line-text relative"
                      href={`mailto:${emailAddress.link}`}
                    >
                      {emailAddress.label}
                    </Link>
                  </li>
                )}
              </ul>
              <ul>
                <li className="text-xl pb-4">{footerHelpSection?.helpTitle}</li>
                {footerHelpSection?.helpLinks.map((e: any) => {
                  return (
                    <li>
                      {e?.link && e?.label && (
                        <Link href={e.link}>{e.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <ul>
                <li className="text-xl pb-4">
                  {servicesFooter?.servicesTitle}
                </li>
                {servicesFooter?.servicesList?.map((e: any, index: any) => {
                  return (
                    <li key={index}>
                      <span className="pr-3">-</span>
                      {e}
                    </li>
                  );
                })}
              </ul>

              <ul>
                <li className="text-xl pb-4">
                  {footerStoreLocator?.helpTitle}
                </li>
                {footerStoreLocator.helpLinks.map((e: any, index: any) => {
                  return (
                    <li key={index}>
                      {e?.link && e?.label && (
                        <Link href={e.link}>{e.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="float-left pt-2">© Byredo</div>
          <Link href="https://www.instagram.com/officialbyredo/" target="_blank" rel="noopener noreferrer">
            <div className="float-right">{svgIcons.instagram}</div>
            </Link>
            <Link href="https://www.facebook.com/byredo/" target="_blank" rel="noopener noreferrer">
            <div className="float-right pr-4">{svgIcons.facebook}</div>
          </Link>
        </div>
      </div>

      <CookieConsent
        buttonText={_site.c_cookieButton.label}
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
         
        <p>
        {_site.c_cookieText}
          <Link className="text-cookies-link p-2 font-bold" href={_site.c_cookiePolicy.link}>
          {_site.c_cookiePolicy.label}
          </Link>
          {_site.c_cookieTextAfter}
        </p>
      </CookieConsent>
    </>
  );
};
export default Footer;
