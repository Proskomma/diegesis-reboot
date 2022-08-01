import React from "react";
import PropTypes, { element } from "prop-types";
import { menuController } from "@ionic/core/components";
import { IonItem, IonText } from "@ionic/react";
import { makeTextReference } from "./makeTexteReference";

export default function NSearchResultRow({
  p,
  n,
  navState,
  setNavState,
  wordMatched,
}) {
  const searchReference = async (reference) => {
    setNavState({
      ...navState,
      bookCode: reference.bookCode,
      chapter: reference.startChapter,
      verse: reference.startVerse,
    });
    await menuController.close();
  };
  function makeSearchTextPop(text, words) {
    let truc = [text];
    words.map((word) => {
     
      let br = [];
      truc.map((textes) => {
        let ar = [];
        if (!words.includes(textes)) {
          textes.split(word).map(t => ar.push(t));
          ar.map((a, id) => {
            br.push(a);
            if (id !== ar.length - 1) {
              br.push(word);
            }
          });
        }
        else{br.push(textes)}
      });
      truc = br;
    });
    return truc;
  }

  return (
    <IonItem key={n}>
      <IonText class="hanging">
        <IonText
          class="cv"
          color="tertiary"
          onClick={() => searchReference(p.reference)}
        >
          {makeTextReference(p.reference)}
        </IonText>{" "}
        {makeSearchTextPop(p.text, wordMatched).map((text) => {
          if (!wordMatched.includes(text)) {
            return <IonText>{text}</IonText>;
          } else {
            return <IonText color="tertiary">{text}</IonText>;
          }
        })}
      </IonText>
    </IonItem>
  );
}

NSearchResultRow.propTypes = {
  p: PropTypes.object.isRequired,
  n: PropTypes.number.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};
