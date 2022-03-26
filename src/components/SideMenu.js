import {IonContent, IonHeader, IonMenu, IonToolbar, IonButton, IonIcon} from "@ionic/react";
import React, {useState} from "react";
import PropTypes from "prop-types";
import SideMenuNavigation from "./SideMenuNavigation";
import SideMenuSearch from "./SideMenuSearch";
import {albums, albumsOutline, search, searchOutline} from 'ionicons/icons';

export default function SideMenu({catalog, navState, setNavState}) {

    const [selected, setSelected] = useState('navigation');

    return <IonMenu
        side="start"
        type="overlay"
        contentId="main"
        swipeGesture={true}
    >
        <IonHeader>
            <IonToolbar color="secondary">
                <IonButton slot="start" fill="clear" onClick={() => setSelected('navigation')}>
                    <IonIcon icon={selected === 'navigation' ? albums : albumsOutline} />
                </IonButton>
                <IonButton slot="end" fill="clear" onClick={() => setSelected('search')}>
                    <IonIcon icon={selected === 'search' ? search : searchOutline} />
                </IonButton>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            {selected === 'navigation' && <SideMenuNavigation catalog={catalog} navState={navState} setNavState={setNavState} />}
            {selected === 'search' && <SideMenuSearch catalog={catalog} navState={navState} setNavState={setNavState} />}
        </IonContent>
    </IonMenu>
}

SideMenu.propTypes = {
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
