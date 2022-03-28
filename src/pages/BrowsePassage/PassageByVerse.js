import React from "react";
import PropTypes from "prop-types";
import {IonList, IonListHeader, IonItem, IonText} from '@ionic/react';

export default function PassageByVerse({cvArray, docSets}) {
    return cvArray.map((cv, n) => <IonList key={n}>
            <IonListHeader class="mainContentTitle2">{cv[0].split("/")[1]}:{cv[1].split("/")[1]}</IonListHeader>
            {docSets.filter(ds => ds.document).map((ds, n2) => <IonList key={n2}>
                    <IonItem>
                        <IonText>
                            <IonText class="cv">{ds.id}</IonText> <IonText>{ds.document.cv[n].text}</IonText>
                        </IonText>
                    </IonItem>
                </IonList>
            )}
        </IonList>
    )
}

PassageByVerse.propTypes = {
    cvArray: PropTypes.array.isRequired,
    docSets: PropTypes.array.isRequired,
};