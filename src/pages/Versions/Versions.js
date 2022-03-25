import React from "react";
import PropTypes from "prop-types";
import { IonAccordionGroup, IonContent, IonPage, IonItem, IonList, IonListHeader } from "@ionic/react";
import PageHeader from "./PageHeader";
// import PkErrors from "../../components/PkErrors";
import { useIonRouter } from "@ionic/react";
import VersionsAccordion from "./VersionsAccordion";

import "./Versions.css";

export default function Versions({navState, setNavState, catalog}) {

    const router = useIonRouter();
    const chapterClick = (e) => {
        const element = e?.target;
        const docSetId = element?.getAttribute("doc");
        const bookCode = element?.getAttribute("book");
        const chapter = parseInt(element?.getAttribute("chapter"));
        setNavState((prevState) => ({ ...prevState, docSetId: docSetId ,bookCode: bookCode, chapter: chapter}));
        router.push("/browseChapter");
    };

    return (
        <IonPage>
            <PageHeader title="List Versions" />
            <IonContent fullscreen>
                <IonList>
                    <IonListHeader class="mainContentTitle" color="primary">{`${catalog.nDocuments} Bible Books in ${catalog.nDocSets} Bibles`}</IonListHeader>
                    <IonItem>
                        <IonAccordionGroup expand="inset" value={navState.docSetId}>
                            {catalog.docSets && catalog.docSets.map((ds, n) => <VersionsAccordion 
                                docSet={ds} 
                                n={n} 
                                catalog={catalog} 
                                cClick={chapterClick} 
                                navState={navState} 
                                setNavState={setNavState} 
                                key={n}  
                            />)}
                        </IonAccordionGroup>
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
};
