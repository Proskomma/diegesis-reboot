import React from "react";
import PropTypes from "prop-types";
import { menuController } from "@ionic/core/components";
import { IonItem, IonText } from "@ionic/react";
import { makeTextReference } from "./makeTexteReference";


export default function NSearchResultRow({ p, n, navState, setNavState }) {
  const searchReference = async (reference) => {
    setNavState({
      ...navState,
      bookCode: reference.bookCode,
      chapter: reference.startChapter,
      verse: reference.startVerse,
    });
    await menuController.close();
  };

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
        <IonText>{p.text}</IonText>
      </IonText>
    </IonItem>
  );
}

NSearchResultRow.propTypes = {
  p: PropTypes.object.isRequired,
  n: PropTypes.number.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};
