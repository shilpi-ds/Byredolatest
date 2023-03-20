import * as React from "react";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import "../../types/i18n.tsx";

function LocalesDropdown(props: any) {
  //console.log(props.country);
  const [color, setColor] = React.useState(null);
  const onColorChange = (e: any) => props.updatelocale(e.target.value);
  const { t, i18n } = useTranslation();
  //const [section, setSection] = useState(0);
  const [section, setSection] = useState(0);
  const [isActive, setIsActive] = useState('section-chat');

  const handleClick = (e:any) => {
    setSection(e.target.value);
   // alert(e.target.value);
  };
  const [selected, setSelected] = React.useState("");
  return (
    <div>
      <form>
        {/* <select onChange={onColorChange} value={color}> */}
        <select onChange={(e) => {handleClick(e)}}>
        {props.country?.map((e: any,ind) => {
          //console.log(e);
                  return (
                    
                       <option value={ind} >{e.country}</option>
                    
                  );
                })}
          {/* <option>{t("Select Country")}</option>
          <option value="en-GB">{t("English")}</option>
          <option value="fr-FR">{t("French")}</option>
          <option value="it-IT">{t("Italian")}</option>
          <option value="ja-JP">{t("Japanese")}</option>
          <option value="de-DE">{t("German")}</option> */}
        </select>
        <select onChange={onColorChange} value={color}>
       
         //console.log(e.language);
        
                  
                    {props.country[section].language?.map((el: any,indd) => {
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


