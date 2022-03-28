import React, {useState, useEffect} from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonContent, IonPage, IonInput, IonLabel, IonList, IonItem, IonIcon, IonButton} from '@ionic/react';
import {options} from 'ionicons/icons';
import PageHeader2 from "../../components/PageHeader2";
import parseReferenceString from "./parseReferenceString";
import PassageResults from "./PassageResults";
import BrowsePassageOptions from "./BrowsePassageOptions";
import "./BrowsePassage.css";
import InputDisplay from "./InputDisplay";

export default function BrowsePassage({pkState, navState}) {

    const [reference, setReference] = useState('3JN 1:1-3');
    const [parsedReference, setParsedReference] = useState('3JN 1:1-3');
    const [parseResult, setParseResult] = useState({});
    const [showOptions, setShowOptions] = useState(false);
    const displayFlags = {
        versesForOneVersion: {allDocSets: false, groupVerses: false, byBlock: false},
        versesByVersion: {allDocSets: true, groupVerses: false, byBlock: false},
        versesByVerse: {allDocSets: true, groupVerses: true, byBlock: false},
        blocksForOneVersion: {allDocSets: false, groupVerses: false, byBlock: true},
        blocksByVersion: {allDocSets: true, groupVerses: false, byBlock: true},
    };

    const [displayMode, setDisplayMode] = useState("versesForOneVersion");

    const verbose = true;

    useEffect(
        () => {
            setReference(`${navState.bookCode} ${navState.chapter}:${navState.verse}`);
        },
        [navState]
    );

    useEffect(
        () => {
            const pr = parseReferenceString(reference);
            setParseResult(pr);
            if (pr.parsed) {
                setParsedReference(pr.original);
            }
        },
        [reference]
    );

    const query = `{
        docSets { 
          id
          document(bookCode:"${parsedReference.split(/\s+/)[0]}") {
          bookCode: header(id: "bookCode")
          cv(chapterVerses:"${parsedReference.split(/\s+/)[1]}") {
            scopeLabels(startsWith:["chapter", "verses"])
            text
          }
          mainSequence {
              blocks(withScriptureCV:"${parsedReference.split(/\s+/)[1]}") {
                  scopeLabels(startsWith: ["blockTag"])
                  text (withScriptureCV:"${parsedReference.split(/\s+/)[1]}")
                  items{type subType payload}
            }
          }
        }
      }
    }`;

    const queryState = useQuery({
        ...pkState,
        query: query,
        verbose,
    });
    const selectedDocSets = queryState.data.docSets?.filter((ds) => displayFlags[displayMode]?.allDocSets || ds.id === navState.docSetId) || [];

    return (
        <IonPage>
            <PageHeader2 title="View Passage" />
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonButton
                            slot="start"
                            fill="clear"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <IonIcon icon={options} />
                        </IonButton>
                        <IonLabel position="floating">Bible reference</IonLabel>
                        <IonInput
                                value={reference}
                                onIonChange={e => setReference(e.target.value)}
                                type="reference"
                                name="bibleReference"
                                debounce={500}
                                max="100"
                                maxlength="20"
                        />
                        <InputDisplay parseR={parseResult} name="bibleReference" slot="end" />
                    </IonItem>
                    {showOptions && <BrowsePassageOptions  
                        displayMode={displayMode} 
                        setDisplayMode={setDisplayMode} 
                    />}
                    <PassageResults
                        reference={reference}
                        parseResult={parseResult}
                        docSets={selectedDocSets}
                        displayFlags={displayFlags}
                        displayMode={displayMode}
                        navState={navState}
                    />
                </IonList>
            </IonContent>
        </IonPage>
    );
}

BrowsePassage.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
};
