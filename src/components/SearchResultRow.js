import React from "react";
import PropTypes from "prop-types";
import {IonItem, IonText} from "@ionic/react";

export default function SearchResultRow({p, n}) {

    return <IonItem key={n} >
                    <IonText class="hanging">
                        <IonText class="cv">{p.reference}</IonText> <IonText>{p.text}</IonText>
                    </IonText>
                </IonItem>
    
}

SearchResultRow.propTypes = {
    p: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
};