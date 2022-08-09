import {
  IonContent,
  IonHeader,
  IonMenu,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import SideMenuNavigation from "./SideMenuNavigation";
import NSideMenuSearch from "./NSideMenuSearch";

import {
  albums,
  albumsOutline,
  search,
  searchOutline,
  settings,
  download,
  downloadOutline,
} from "ionicons/icons";
import AppLangOptions from "./AppLangOptions";
import SideMenuBibleDownload from "./SideMenuBibleDownload";


export default function SideMenu({
  catalog,
  pkState,
  navState,
  setNavState,
  appLanguage,
  setAppLanguage,
  client
}) {

  const [selected, setSelected] = useState("navigation");
  const [showAppLang, setShowAppLang] = useState(false);

  return (
    <IonMenu side="start" type="overlay" contentId="main" swipeGesture={true}>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={() => setSelected("navigation")}>
              <IonIcon
                icon={selected === "navigation" ? albums : albumsOutline}
              />
            </IonButton>
            <IonButton fill="clear" onClick={() => setSelected("search")}>
              <IonIcon icon={selected === "search" ? search : searchOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setSelected("download")}>
              <IonIcon
                icon={selected === "download" ? download : downloadOutline}
              />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              size="small"
              fill="clear"
              onClick={() => setShowAppLang(!showAppLang)}
            >
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen="true">
        {showAppLang && (
          <AppLangOptions
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
          />
        )}
        {selected === "navigation" && (
          <SideMenuNavigation
            navState={navState}
            setNavState={setNavState}
            catalog={catalog}
          />
        )}
        {selected === "search" && (
          <NSideMenuSearch
            pkState={pkState}
            navState={navState}
            setNavState={setNavState}
          />
        )}
        {selected === "download" && (
          <SideMenuBibleDownload client={client} pkState={pkState} catalog={catalog} />
        )}
      </IonContent>
    </IonMenu>
  );
}

SideMenu.propTypes = {
  catalog: PropTypes.object.isRequired,
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
  appLanguage: PropTypes.string.isRequired,
  setAppLanguage: PropTypes.func.isRequired,
  client : PropTypes.object.isRequired
};
