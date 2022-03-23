import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';

export default function PassageByBlocks({docSets, displayFlags, displayMode, navState}) {
    return  docSets
    .filter((ds) => displayFlags[displayMode].allDocSets || ds.id === navState.docSetId)
    .map( (ds, n1) => <div key={n1}>
        {docSets.length > 1 && <IonRow>
            <IonCol>
                <IonTitle>{ds.id}</IonTitle>
            </IonCol>
        </IonRow>}
        {ds.document.mainSequence.blocks.map((b, n2) => <IonRow key={`${n2}-${n1}`}><IonCol>{b.text}</IonCol></IonRow>)
        }</div>)
     
}   

PassageByBlocks.propTypes = {
    docSets: PropTypes.array.isRequired,
    displayFlags: PropTypes.object.isRequired,
    displayMode: PropTypes.string.isRequired,
    navState: PropTypes.object.isRequired,
};