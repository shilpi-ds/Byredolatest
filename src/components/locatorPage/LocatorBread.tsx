import { Link } from "@yext/pages/components";
import * as React from "react";
import { svgIcons } from "../../svg icons/svgIcon";
const LocatorBread = (props: any) => {
    return (
        <div className="breadcrumb">
            <ul>
              <li>
                <Link href="#">
                {svgIcons.homeIcon}
                </Link>
              </li>
             
              <li>Store Locator</li>
            </ul>
        </div>
      );
    };
    export default LocatorBread;