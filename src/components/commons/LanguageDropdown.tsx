import * as React from "react";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import "../../types/i18n.tsx";
import $ from "jquery";
function LocalesDropdown(props: any) {
  //console.log(props.country);
  const [language, setLanguage] = React.useState("");
  const onLanguageChange = (e: any) => props.updatelocale(e.target.value);
  const { t, i18n } = useTranslation();

  const [section, setSection] = useState(0);


  const handleClick = (e:any) => {
    setSection(e.target.value);
    var url=e.target[e.target.value].text;
    //alert(e.target[e.target.value].text);
    var lang=$(".language").val();
    //alert(lang);
    if(url=="France" && lang=="en-GB")
    {
      props.updatelocale("fr-FR");
    }
    else if(url=="Japan" && lang=="en-GB")
    {
      props.updatelocale("ja-JP");
    }
    else  if(url=="United Kingdom" && lang=="en-GB")
    {
      props.updatelocale("en_GB");
    }
  };

  return (
    <div>
      <form>
      
        <select onChange={(e) => {handleClick(e)}}>
        {props.country?.map((e: any,ind:any) => {
          //console.log(e);
                  return (
                    
                       <option value={ind} >{e.country}</option>
                    
                  );
                })}

        </select>
        <select onChange={onLanguageChange} value={language} className="language">
       
         //console.log(e.language);
        {/* <option value="Select Language">Select Language</option> */}
                  
                    {props.country[section].language?.map((el: any,indd:any) => {
                      //console.log(el);
                              return (
                                
                                   <option value={el.languageCode} key={indd}>{el.language}</option>
                                
                              );
                            })}
                           
                           
                  
            
          </select>
      </form>
    </div>
  );
}

export default withTranslation()(LocalesDropdown);


