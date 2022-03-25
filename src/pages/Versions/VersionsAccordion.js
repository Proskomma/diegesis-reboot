import React from "react";
import PropTypes from "prop-types";
import {IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonText, IonButton} from "@ionic/react";

import "./Versions.css";

export default function VersionsAccordion({docSet, n, catalog, cClick, navState}) {
    return (
        <IonAccordion key={n} value={docSet.id}>
            <IonItem slot="header">
                <IonLabel class="accordionLabel">{docSet.id}</IonLabel>
            </IonItem>
            
            <IonList slot="content">
                <IonAccordionGroup expand="inset" value={navState.bookCode}>
                    {docSet.documents.map((d, n2) => (
                        <IonAccordion key={n2} value={d.bookCode}>
                            <IonItem slot="header">
                                <IonLabel class="accordionLabel">{d.bookCode} - {d.toc || d.h || d.toc2 || d.toc3}</IonLabel>
                            </IonItem>
                            <IonText slot="content">
                                {catalog.docSets[n].documents[n2].cvNumbers
                                    .map((c1) => c1.chapter)
                                    .map((c3, n3) => (
                                        <IonButton key={n3} size="small" color="secondary" fill="outline" doc={docSet.id} book={d.bookCode} chapter={c3} onClick={cClick} >{c3}</IonButton>
                                    ))}
                            </IonText>
                        </IonAccordion>
                    ))}
                </IonAccordionGroup>
            </IonList>
        </IonAccordion>
    );
}

VersionsAccordion.propTypes = {
    docSet: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
    catalog: PropTypes.object.isRequired,
    cClick: PropTypes.func.isRequired,
    navState: PropTypes.object.isRequired,
};