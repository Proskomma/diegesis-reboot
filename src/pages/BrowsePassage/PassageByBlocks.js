import React from "react";
import PropTypes from "prop-types";
import {IonList, IonListHeader} from '@ionic/react';
import FormattedParagraph from "./FormattedParagraph";

export default function PassageByBlocks({docSets, displayFlags, displayMode, navState}) {
    return  docSets
    .filter((ds) => displayFlags[displayMode].allDocSets || ds.id === navState.docSetId)
    .filter(ds => ds.document)
    .map( (ds, n1) => <IonList id={`Book-${n1}`} key={n1}>
        {docSets.length > 1 && <IonListHeader class="mainContentTitle2">{ds.id}</IonListHeader>}
        {ds.document.mainSequence.blocks.map((b, n2) => <FormattedParagraph block={b} n1={n1} n={n2}  key={`${n1}-${n2}`} />)
        }</IonList>)
     
}   

PassageByBlocks.propTypes = {
    docSets: PropTypes.array.isRequired,
    displayFlags: PropTypes.object.isRequired,
    displayMode: PropTypes.string.isRequired,
    navState: PropTypes.object.isRequired,
};