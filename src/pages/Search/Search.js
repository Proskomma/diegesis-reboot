import React, {useState} from "react";
import PropTypes from "prop-types";
import {IonPage, IonContent, IonList, IonItem, IonText, IonInput, IonLabel, IonToggle } from "@ionic/react";
import PageHeader2 from "../../components/PageHeader2";
import { useSearchForPassages } from "proskomma-react-hooks";

import "./Search.css";

export default function Search({pkState, navState}) {

    const [searchText, setSearchText] = useState('');
    const [displayMode, setDisplayMode] = useState(false);

    const verbose = true;

    const searchResultRows = (p) => {

        if (!searchText) {
            return <IonItem>
                    <IonText>Please enter some search text</IonText>
                </IonItem>;
        } else if (p.length < 1) {
            return <IonItem>
            <IonText>No text found</IonText>
        </IonItem>;
    } else {
            return p.map((p, n) => <IonList key={n}>
                    <IonItem>
                        <IonLabel slot="start" class="cv">{p.reference}</IonLabel>
                        <IonText>{p.text}</IonText>
                    </IonItem>
            </IonList>)
        }
    }

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

    const resultRows = searchResultRows(passages);

    return (
        <IonPage>
            <PageHeader2 title="Search" />
            <IonContent>
                <IonList>
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
                        {resultRows}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

Search.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
