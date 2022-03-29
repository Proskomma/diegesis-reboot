import {IonAccordionGroup, IonList, IonListHeader, IonItem} from "@ionic/react";
import {menuController} from '@ionic/core/components';
import VersionsAccordion from "./VersionsAccordion";
import React from "react";
import PropTypes from "prop-types";

export default function SideMenuNavigation({catalog, navState, setNavState}) {

    const chapterClick = async e => {
        const element = e?.target;
        const docSetId = element?.getAttribute("doc");
        const bookCode = element?.getAttribute("book");
        const chapter = parseInt(element?.getAttribute("chapter"));
        setNavState((prevState) => ({...prevState, docSetId: docSetId, bookCode: bookCode, chapter: chapter}));
        await menuController.close();
    };

    return <IonList>
        <IonListHeader class="headerTitle">{`${catalog.nDocuments} books in ${catalog.nDocSets} Bibles`}</IonListHeader>
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
}

SideMenuNavigation.propTypes = {
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
