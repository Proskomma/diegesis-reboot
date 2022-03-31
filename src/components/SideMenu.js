import {IonContent, IonHeader, IonMenu, IonToolbar, IonButtons, IonButton, IonIcon} from "@ionic/react";
import React, {useState} from "react";
import PropTypes from "prop-types";
import SideMenuNavigation from "./SideMenuNavigation";
import SideMenuSearch from "./SideMenuSearch";
import {albums, albumsOutline, search, searchOutline, settings} from 'ionicons/icons';
import AppLangOptions from "./AppLangOptions";

export default function SideMenu({catalog, pkState, navState, setNavState, appLanguage, setAppLanguage}) {

    const [selected, setSelected] = useState('navigation');
    const [showAppLang, setShowAppLang] = useState(false);

    return <IonMenu
        side="start"
        type="overlay"
        contentId="main"
        swipeGesture={true}
    >
        <IonHeader>
            <IonToolbar color="secondary">
                <IonButtons slot="start">
                    <IonButton fill="clear" onClick={() => setSelected('navigation')}>
                        <IonIcon icon={selected === 'navigation' ? albums : albumsOutline} />
                    </IonButton>
                    <IonButton fill="clear" onClick={() => setSelected('search')}>
                        <IonIcon icon={selected === 'search' ? search : searchOutline} />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton size="small" fill="clear" onClick={() => setShowAppLang(!showAppLang)}>
                        <IonIcon icon={settings} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            {showAppLang && <AppLangOptions appLanguage={appLanguage} setAppLanguage={setAppLanguage} />}
            {selected === 'navigation' && <SideMenuNavigation catalog={catalog} navState={navState} setNavState={setNavState} />}
            {selected === 'search' && <SideMenuSearch pkState={pkState} navState={navState} setNavState={setNavState} />}
        </IonContent>
    </IonMenu>
}

SideMenu.propTypes = {
    catalog: PropTypes.object.isRequired,
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    appLanguage: PropTypes.string.isRequired,
    setAppLanguage: PropTypes.func.isRequired,
};
