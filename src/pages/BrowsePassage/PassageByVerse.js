import React from "react";
import PropTypes from "prop-types";
import {IonList, IonListHeader, IonItem, IonText} from '@ionic/react';

export default function PassageByVerse({cvArray, docSets}) {
    return cvArray.map((cv, n) => <IonList id={`Verse-${n}`} key={n} onClick={() => {console.log(`Verse-${n}`)
    console.log(document.getElementById(`Verse-${n}`).offsetTop)}}>
            <IonListHeader class="mainContentTitle2">{cv[0].split("/")[1]}:{cv[1].split("/")[1]}</IonListHeader>
            {docSets.filter(ds => ds.document).map((ds, n2) => <IonList id={`${n2}-${n}`} key={n2}>
                    <IonItem onClick={() => {console.log(`${n}-${n2}`)}}>
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