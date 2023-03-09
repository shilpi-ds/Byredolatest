import * as React from "react";
import logo from "../../images/Logo.png";
import { Link } from "@yext/pages/components";

type props = {
ByredoLogo: any;
ByredoLinks: any;
};

const Header = (props: any) => {
  const {ByredoLogo, ByredoLinks } = props;
  return (
      <header className="site-header">
        <div className="container-lg">
          <div className="navbar">
            <div className="logo">
              <Link href="https://www.byredo.com/uk_en/" className="">
                <img
                  src={ByredoLogo.image.url ? ByredoLogo.image.url : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"}
                  alt="Byredo Logo"
                  title="Byredo"
                />
              </Link>
            </div>
            <div className="mid-nav">
              {ByredoLinks?.map((e: any) => {
                return (   
                  <>
                  {e?.link && e?.label &&( 
                    <div className="menu-item">
                      <Link href={e.link} className="">
                        {e.label}
                      </Link>
                    </div>
                  )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </header>
  );
};
export default Header;
