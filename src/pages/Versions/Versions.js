import React from "react";
import PropTypes from "prop-types";
import {IonAccordion, IonAccordionGroup, IonCol, IonContent, IonPage, IonRow, IonItem, IonLabel, IonList, IonTitle, IonText, IonButton} from "@ionic/react";
import PageHeader from "./PageHeader";
import PkErrors from "../../components/PkErrors";
import { useIonRouter } from "@ionic/react";

import "./Versions.css";

export default function Versions({navState, setNavState, catalog, catalogErrors}) {

    const router = useIonRouter();
    const chapterClick = (e) => {
        const element = e?.target;
        const docSetId = element?.getAttribute("doc");
        const bookCode = element?.getAttribute("book");
        const chapter = parseInt(element?.getAttribute("chapter"));
        setNavState((prevState) => ({ ...prevState, docSetId: docSetId ,bookCode: bookCode, chapter: chapter}));
        router.push("/browseChapter");
    };
    const makeAccordion = function (docSet, n) {
        return (
            <IonAccordion key={n} value={docSet.id}>
                <IonItem slot="header">
                    <IonLabel className="accordianLabel">{docSet.id}</IonLabel>
                </IonItem>
                
                <IonList slot="content">
                    <IonAccordionGroup expand="inset" value={navState.bookCode}>
                        {docSet.documents.map((d, n2) => (
                            <IonAccordion key={n2} value={d.bookCode}>
                                <IonItem slot="header">
                                    <IonLabel className="accordianLabel">{d.bookCode} - {d.toc || d.h || d.toc2 || d.toc3}</IonLabel>
                                </IonItem>
                                <IonText slot="content">
                                    {catalog.docSets[n].documents[n2].cvNumbers
                                        .map((c1) => c1.chapter)
                                        .map((c3, n3) => (
                                            <IonButton key={n3} size="small" color="secondary" fill="outline" doc={docSet.id} book={d.bookCode} chapter={c3} onClick={chapterClick} >{c3}</IonButton>
                                        ))}
                                </IonText>
                            </IonAccordion>
                        ))}
                    </IonAccordionGroup>
                </IonList>
            </IonAccordion>
        );
    };

    return (
        <IonPage>
            <PageHeader title="List Versions" />
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonRow>
                            <IonCol>
                                <IonTitle>{`${catalog.nDocuments} Bible Books in ${catalog.nDocSets} Bibles`}</IonTitle>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonAccordionGroup expand="inset" value={navState.docSetId}>
                                    {catalog.docSets && catalog.docSets.map((ds, n) => makeAccordion(ds, n))}
                                </IonAccordionGroup>
                            </IonCol>
                        </IonRow>
                        {catalogErrors && catalogErrors.length > 0 && (
                            <IonRow>
                                <IonCol>
                                    <PkErrors errors={catalogErrors} />
                                </IonCol>
                            </IonRow>
                        )}
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

Versions.propTypes = {
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
    catalogErrors: PropTypes.any,
};
