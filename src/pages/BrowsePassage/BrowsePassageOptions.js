import React from "react";
import PropTypes from "prop-types";
import {IonLabel, IonRadioGroup, IonRadio, IonItem, IonToggle} from '@ionic/react';

export default function BrowsePassageOptions({showOptions, displayMode, setDisplayMode, showAllBibles, setShowAllBibles}) {
    return showOptions && 
        <><IonItem>
            <IonLabel for={showAllBibles} >Show all Bibles</IonLabel>
            <IonToggle value={showAllBibles} onIonChange={() => setShowAllBibles(!showAllBibles)} />
        </IonItem>
        <IonRadioGroup value={displayMode} onIonChange={e => setDisplayMode(e.detail.value)}>
            {!showAllBibles &&<IonItem>
                <IonLabel>Show verses</IonLabel>
                <IonRadio value="versesForOneVersion" />
            </IonItem>}
            {showAllBibles && <IonItem>
                <IonLabel>Group by version, show verses</IonLabel>
                <IonRadio value="versesByVersion" />
            </IonItem>}
            {showAllBibles && <IonItem>
                <IonLabel>Group by verse</IonLabel>
                <IonRadio value="versesByVerse" />
            </IonItem>}
            {!showAllBibles && <IonItem>
                <IonLabel>Show paragraphs</IonLabel>
                <IonRadio value="blocksForOneVersion" />
            </IonItem>}
            {showAllBibles && <IonItem>
                <IonLabel>Group by version, show paragraphs</IonLabel>
                <IonRadio value="blocksByVersion" />
            </IonItem>}
        </IonRadioGroup>
        </>
}

BrowsePassageOptions.propTypes = {
    showOptions: PropTypes.bool.isRequired,
    displayMode: PropTypes.string.isRequired,
    setDisplayMode: PropTypes.func.isRequired,
    showAllBibles: PropTypes.bool.isRequired,
    setShowAllBibles: PropTypes.func.isRequired,
};