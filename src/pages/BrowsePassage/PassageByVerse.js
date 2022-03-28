import React from "react";
import PropTypes from "prop-types";
import {IonList, IonListHeader, IonItem} from '@ionic/react';

export default function PassageByVerse({cvArray, docSets}) {
    return cvArray.map((cv, n) => <IonList key={n}>
            <IonListHeader>{cv[0].split("/")[1]}:{cv[1].split("/")[1]}</IonListHeader>
            {docSets
            .filter(ds => ds.document)
            .map((ds, n2) => <IonList key={n2}>
                    <IonItem>
                        {ds.id}
                    </IonItem>
                    <IonItem>
                        {ds.document.cv[n].text}
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