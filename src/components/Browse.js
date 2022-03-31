import React, {useState, useContext} from 'react';
import PropTypes from "prop-types";
import { IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonToggle, IonLabel } from '@ionic/react';
import BrowsePassage from "../pages/BrowsePassage/BrowsePassage";
import BrowseBook from "../pages/BrowseBook/BrowseBook";
import i18n from '../lib/i18n';
import AppLangContext from "../contexts/AppLang";

export default function Browse({pkState, navState, catalog}) {
    const appLang = useContext(AppLangContext);

    const [showPassage, setShowPassage] = useState(false);

 return <>
    <IonHeader>
        <IonToolbar color="primary" >
            <IonMenuButton slot="start" />
            <IonTitle>{`${navState.bookCode} - ${navState.docSetId}`}</IonTitle>
            <IonLabel slot="end">{i18n(appLang, 'passage')}</IonLabel>
            <IonToggle slot="end" color="light" onIonChange={() => setShowPassage(!showPassage)} />
        </IonToolbar>
    </IonHeader>
    <IonContent id="main"> 
        { showPassage ? <BrowsePassage pkState={pkState} navState={navState} /> : <BrowseBook pkState={pkState} navState={navState} catalog={catalog} />

        }
    </IonContent>
 </>
}

Browse.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
};