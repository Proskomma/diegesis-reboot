import React from "react";
import PropTypes from "prop-types";
import {IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonText, IonButton} from "@ionic/react";

import "./VersionsAccordion.css";

export default function VersionsAccordion({docSet, n, catalog, cClick, navState}) {
    return (
        <IonAccordion key={n} value={docSet.id}>
            <IonItem slot="header">
                <IonLabel class="accordionLabel" color="secondary">{docSet.id}</IonLabel>
            </IonItem>

            <IonList slot="content">
                <IonAccordionGroup expand="inset" value={navState.bookCode}>
                    {docSet.documents.map((d, n2) => (
                        <IonAccordion key={n2} value={d.bookCode}>
                            <IonItem slot="header">
                                <IonLabel color="tertiary" class="accordionLabel">{d.toc3 || d.toc2 || d.h || d.toc}</IonLabel>
                            </IonItem>
                            <IonText slot="content">
                                {Object.keys(catalog.docSets[n].documents[n2].versesByChapters)
                                    .map((c3, n3) => (
                                        <IonButton
                                            key={n3}
                                            size="small"
                                            fill="clear"
                                            doc={docSet.id}
                                            book={d.bookCode}
                                            chapter={c3}
                                            onClick={cClick}
                                        >
                                            {c3}
                                        </IonButton>
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
