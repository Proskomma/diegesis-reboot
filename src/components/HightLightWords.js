import React, { useEffect, useState } from "react";
import { IonText,IonPopover,IonContent} from "@ionic/react";
import PropTypes from "prop-types";

export default function HightLightWords({keys, element, wordMatched }) {
  const [changed, setChanged] = useState(false);
  const [classe, setClasse] = useState("iontext0");
  
  useEffect(() => {
    if (changed) {
      setClasse("iontext1");
    } else {
      setClasse("iontext0");
    }
  }, [changed]);
  function creatInfo(scopes){
    let title = ""
    let lemma = ""
    let strong = ""
    let morph = ""
    scopes.forEach(element => {
      if(element.includes("x-lemma")){
        lemma = element.split("/")
        lemma = lemma[lemma.length -1]
      
      }
      if(element.includes("x-morph")){
        morph = element.split("/")
        morph = morph[morph.length -1]
    }
    if(element.includes("x-strong")){
      strong = element.split("/")
      strong = strong[strong.length -1]
  }
  if(element.includes("x-content")){
    title = title.split("/")
    title = title[title.length -1]
}
  })
  return( 
    <IonContent>
      <IonText >{`Content : ${title}\n`}</IonText>
      <IonText>{`\nLemma : ${lemma}`}</IonText>
      <IonText>{`\nStrong : ${strong}`}</IonText>
      <IonText>{`\nMorph : ${morph}`}</IonText>
    </IonContent >
  )
  }


  if (element.subType === "lineSpace" || element.subType === "punctuation") {
    return <IonText class={"iontext0"}>{element.payload}</IonText>;
  } else {
    if (wordMatched.includes(element.payload)) {
      return (
        <IonText 
          onClick={() => {
            setChanged(!changed);
          }}
          id={keys}
          class={classe}
          color="tertiary"
        >
          {element.payload}
      <IonPopover onDidDismiss={() => {setChanged(!changed)}} trigger={keys} triggerAction="onClick">
      {creatInfo(element.scopes)}
      </IonPopover>
        </IonText>
      );
    } else {
      return (
        <IonText
        id={keys}
          onClick={() => {
            setChanged(!changed);
          }}
          class={classe}
        >
          {element.payload}
          <IonPopover class="ionpopover"onDidDismiss={() => {setChanged(!changed)}} trigger={keys} triggerAction="onClick" size="auto">
        {creatInfo(element.scopes)}
        </IonPopover>
        </IonText>
      );
    }
  }
}


HightLightWords.propTypes = {
  element: PropTypes.object.isRequired,
  wordMatched: PropTypes.array.isRequired,
  keys: PropTypes.number.isRequired,
};
