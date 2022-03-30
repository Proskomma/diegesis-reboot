import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {IonLabel, IonRadioGroup, IonRadio, IonItem, IonToggle} from '@ionic/react';
import i18n from "../../lib/i18n";
import AppLangContext from "../../contexts/AppLang";

export default function BrowsePassageOptions({displayMode, setDisplayMode}) {

    const appLang = useContext(AppLangContext);

    const [showAllBibles, setShowAllBibles] = useState(false);

    return <>
        <IonItem>
            <IonLabel for={showAllBibles} color="secondary">{i18n(appLang, 'show_all_bibles')}</IonLabel>
            <IonToggle value={showAllBibles} onIonChange={() => setShowAllBibles(!showAllBibles)} />
        </IonItem>
        <IonRadioGroup value={displayMode} onIonChange={e => setDisplayMode(e.detail.value)}>
            {!showAllBibles &&<IonItem>
                <IonLabel color="secondary">{i18n(appLang, 'show_verses')}</IonLabel>
                <IonRadio value="versesForOneVersion" />
            </IonItem>}
            {showAllBibles && <IonItem>
                <IonLabel color="secondary">{i18n(appLang, 'group_version_show_verses')}</IonLabel>
                <IonRadio value="versesByVersion" />
            </IonItem>}
            {showAllBibles && <IonItem>
                <IonLabel color="secondary">{i18n(appLang, 'group_verse')}</IonLabel>
                <IonRadio value="versesByVerse" />
            </IonItem>}
            {!showAllBibles && <IonItem>
                <IonLabel color="secondary">{i18n(appLang, 'show_paragraphs')}</IonLabel>
                <IonRadio value="blocksForOneVersion" />
            </IonItem>}
            {showAllBibles && <IonItem>
                <IonLabel color="secondary">{i18n(appLang, 'group_version_show_paragraphs')}</IonLabel>
                <IonRadio value="blocksByVersion" />
            </IonItem>}
        </IonRadioGroup>
        </>
}

BrowsePassageOptions.propTypes = {
    displayMode: PropTypes.string.isRequired,
    setDisplayMode: PropTypes.func.isRequired,
};
