import * as React from "react";
import { slugify, BaseUrl } from "../../config/globalConfig";
import { svgIcons } from "../../svg icons/svgIcon";
import { Link } from "@yext/pages/components";
type data = {
  name: any;
  parents: any;
  address: any;
  site: any;
};
const BreadCrumbs = (props: data) => {
  const [list, setList] = React.useState(null);
  var breadcrumbs;
  var data: any = [];
  React.useEffect(() => {
    setURL(props.parents);
  }, [setList]);
console.log(props,"props");
  const setURL = (parents: any) => {
    if (parents) {
      for (let i = 0; i < parents.length; i++) {
        if (parents[i].meta.entityType.id == "ce_country") {
        
          let url = "";

          let slugString = parents[i].meta.entityType.id + " " + parents[i].name;
          //console.log(slugString,"sluggggg");
          let slug = slugify(slugString);
        
          if (typeof parents[i].slug == "undefined") {
        
            let slugStrings: any = [];
            if (typeof parents[i].dm_directoryParents != "undefined") {
              parents[i].dm_directoryParents?.map((e: any, index: number) => {
        
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
        
             if (typeof parents[i].dm_directoryParents != "undefined") {
              parents[i].dm_directoryParents?.map((e: any) => {
        
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
              url = `${slugStrings.join("/")}/${parents[i].slug.toString()}`;
            } else {
              url = `${parents[i].slug.toString()}`;
            }
        
           }
        //console.log(url,"url")
          //return parents[i].meta.locale+"/"+url+".html";












          data.push({

            name: parents[i].name,
            //slug: parents[i].slug,
            slug: url,
            childrenCount: parents[i].dm_directoryChildrenCount,
          });
        } else if (parents[i]?.meta?.entityType?.id == "ce_region") {
          let regionSlugPrifix = [];
          for (let r = 0; r < parents.length; r++) {
            if (
              parents[r].meta.entityType.id != "ce_root" &&
              parents[r].meta.entityType.id != "ce_region" &&
              parents[r]?.meta?.entityType.id != "ce_city"
            ) {
              if (typeof parents[r].slug == "undefined") {
                regionSlugPrifix.push(
                  slugify(parents[r].id + " " + parents[r].name)
                );
              } else {
                regionSlugPrifix.push(parents[r].slug);
              }
            }
          }

          let regionSlug = "";
          if (typeof parents[i].slug == "undefined") {
            regionSlug = slugify(parents[i].id + " " + parents[i].name);
          } else {
            regionSlug = parents[i].slug;
          }

          data.push({
            name: parents[i].name,
            slug: regionSlugPrifix.join("/") + "/" + regionSlug,
            childrenCount: parents[i].dm_directoryChildrenCount,
          });
        } else if (parents[i]?.meta?.entityType.id == "ce_city") {
          let citySlugPrifix = [];
          for (let c = 0; c < parents.length; c++) {
            if (
              parents[c]?.meta?.entityType.id != "ce_city" &&
              parents[c].meta.entityType.id != "ce_root"
            ) {
              if (typeof parents[c].slug == "undefined") {
                citySlugPrifix.push(
                  slugify(parents[c].id + " " + parents[c].name)
                );
              } else {
                citySlugPrifix.push(parents[c].slug);
              }
            }
          }

          let citySlug = "";
          if (typeof parents[i].slug == "undefined") {
            citySlug = slugify(parents[i].id + " " + parents[i].name);
          } else {
            citySlug = parents[i].slug;
          }

          data.push({
            name: parents[i].name,
            slug: citySlugPrifix.join("/") + "/" + citySlug,
            childrenCount: parents[i].dm_directoryChildrenCount,
          });
        }
      }
      

      breadcrumbs = data?.map((crumb: any, index: any) => (
        <li key={crumb.slug}>
          <Link
            href={`/${crumb.slug}.html`}
            rel="noopener noreferrer"
            eventName={"BreadCrumbs" + (index + 1)}
          >
            {crumb.name}
          </Link>
        </li>
      ));
      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };

  return (
    <div className="breadcrumb">
      <div className="container">
        <ul>
          <li className="home">
            <Link href="/index.html">Home</Link>
          </li>
          {list && (
            list)
            }
          <li>{props && props.name}</li>
        </ul>
      </div>
    </div>
  );
};
export default BreadCrumbs;
