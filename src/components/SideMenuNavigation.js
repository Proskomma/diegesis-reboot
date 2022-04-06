import {IonAccordionGroup, IonList, IonListHeader, IonItem} from "@ionic/react";
import {menuController} from '@ionic/core/components';
import VersionsAccordion from "./VersionsAccordion";
import React, {useContext} from "react";
import PropTypes from "prop-types";
import i18n from '../lib/i18n';
import AppLangContext from "../contexts/AppLang";

export default function SideMenuNavigation({catalog, navState, setNavState}) {

    const appLang = useContext(AppLangContext);

    const chapterClick = async e => {
        const element = e?.target;
        const docSetId = element?.getAttribute("doc");
        const bookCode = element?.getAttribute("book");
        const chapter = parseInt(element?.getAttribute("chapter"));
        setNavState((prevState) => ({...prevState, docSetId: docSetId, bookCode: bookCode, chapter: chapter}));
        await menuController.close();
    };

    return <IonList>
        <IonListHeader class="headerTitle">{`${catalog.nDocuments} ${i18n(appLang, 'books_in')} ${catalog.nDocSets} ${i18n(appLang, 'bibles')}`}</IonListHeader>
        <IonItem>
            <IonAccordionGroup expand="inset" value={navState.docSetId}>
                {catalog?.docSets.map((ds, n) => <VersionsAccordion
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
