import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonToggle,
  IonLabel,
} from "@ionic/react";
import BrowsePassage from "../pages/BrowsePassage/BrowsePassage";
import i18n from "../lib/i18n";
import AppLangContext from "../contexts/AppLang";

export default function Browse({ pkState, navState,catalog}) {
  const appLang = useContext(AppLangContext);
  const [showPassage, setShowPassage] = useState(true);
  const [it,seti] = useState(0)
  let title = navState.docSetId
  let d = navState.bookCode
  for (let element of catalog.docSets){
    if(element.id === navState.docSetId)
        { 
          if(element.tags.title){
            title = element.tags.title
          }
          for(let document of element.documents){
          
          if(document.bookCode.toc3 || document.bookCode.toc2 || document.bookCode.h || document.bookCode.toc){
            d = document.bookCode
          }
            
            break;
        }
        break;
}
  }

  useEffect(() => {
    console.log(it)
    let w = 0
    for (let element of catalog.docSets){
        if(element.id === navState.docSetId)
        { 
            break;
}
         else{console.log(element.id)
              console.log(navState.docSetId)
              w = w  + 1}
            }
    seti(w)
    setTimeout(() => {
      let content = document.getElementById("main");
      let element = document.getElementById(`${w}-${navState.verse-1}`)
      seti(w)
      if(element){
      
      let offset2 = 0
      
      while(element.id !== "main"){
        offset2 += element.offsetTop
        element = element.parentElement
      }

      console.log(`${w}-${navState.verse}`)
      content?.scrollToPoint(0, offset2)
    }
      
    }, 5000);
  }, [navState]);

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" />
          <IonTitle>{`${d.toc3 || d.toc2 || d.h || d.toc || navState.bookCode} - ${title || navState.docSetId}`}</IonTitle>
          <IonLabel slot="end">{i18n(appLang, "passage")}</IonLabel>
          <IonToggle
            slot="end"
            color="light"
            onIonChange={() => setShowPassage(!showPassage)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent id="main" scrollEvents={true}>
        <BrowsePassage
          pkState={pkState}
          navState={navState}
          it={it}
        />{" "}
        :
      </IonContent>
    </>
  );
}

Browse.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
