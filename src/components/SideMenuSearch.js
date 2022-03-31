import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {IonList, IonItem, IonSearchbar, IonLabel, IonToggle } from "@ionic/react";
import { useSearchForPassages } from "proskomma-react-hooks";
import SearchResults from "./SearchResults";
import i18n from '../lib/i18n';
import AppLangContext from "../contexts/AppLang";

export default function SideMenuSearch({pkState, navState, setNavState}) {

    const appLang = useContext(AppLangContext);

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
                    <IonSearchbar
                        value={searchText} 
                        size='small'
                        onIonChange={(e)=>setSearchText(e.target.value)}
                        debounce={500}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="relative">{i18n(appLang, 'show_blocks')}</IonLabel>
                    <IonToggle slot="end" onIonChange={() => setDisplayMode(!displayMode)}></IonToggle>
                </IonItem>
                <SearchResults p={passages} searchText={searchText} navState={navState} setNavState={setNavState} />
            </IonList>
}

SideMenuSearch.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
};
