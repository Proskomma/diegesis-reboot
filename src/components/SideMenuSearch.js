import React, {useState} from "react";
import PropTypes from "prop-types";
import {IonList, IonItem, IonInput, IonLabel, IonToggle } from "@ionic/react";
import { useSearchForPassages } from "proskomma-react-hooks";
import SearchResults from "./SearchResults";

export default function SideMenuSearch({pkState, navState}) {

    const [searchText, setSearchText] = useState('');
    const [displayMode, setDisplayMode] = useState(false);

    const verbose = true;

    const {
        // stateId: searchStateId,
        // bookCodes,
        passages,
        // passagesBookCodes,
        // dataArray,
        // errors: searchErrors,
    } = useSearchForPassages({
        proskomma: pkState.proskomma,
        stateId: pkState.stateId,
        text: searchText,
        docSetId: navState.docSetId,
        blocks: displayMode,
        tokens: false,
        verbose,
    });

    return <IonList>
                <IonItem>
                    <IonLabel position="floating" color="primary">Search: </IonLabel>
                    <IonInput
                        value={searchText} 
                        size='small'
                        onIonChange={(e)=>setSearchText(e.target.value)}
                        type="searchInput"
                        name="search"
                        debounce={500}
                        max="100"
                        maxlength="20"
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="relative">Show blocks:</IonLabel>
                    <IonToggle slot="end" onIonChange={() => setDisplayMode(!displayMode)}></IonToggle>
                </IonItem>
                <SearchResults p={passages} searchText={searchText} />
            </IonList>
}

SideMenuSearch.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
};
