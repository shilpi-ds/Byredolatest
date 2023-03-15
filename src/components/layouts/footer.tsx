import * as React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { cookieText, cookieText1, cookieUrl } from "../../config/globalConfig";
import LocalesDropdown from "../../components/commons/LanguageDropdown";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";

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
    path
  } = props;

  return (
    <>
      <div className="subfooter-sec">
        <div className="container-lg">
          <div className="subfooter-inner">
            <div className="subfooter-links">
               
              <ul>
                <li><LocalesDropdown updatelocale={path} /></li>
                <li className="text-xl pb-4">{customerCare}</li>

                <li className="icon-row location-phone ">
                  <span className="icon">{svgIcons.phone}</span>
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
                  <li className="icon-row location-phone ">
                    <span className="icon">{svgIcons.email}</span>
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
        buttonText="Accept All Cookies"
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
        <p>
          {cookieText}
          <Link className="text-cookies-link p-2 font-bold" href={cookieUrl}>
            cookie policy
          </Link>
          {cookieText1}.
        </p>
      </CookieConsent>
    </>
  );
};
export default Footer;
