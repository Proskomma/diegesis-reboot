import React, {useState, useEffect} from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonContent, IonPage, IonInput, IonLabel, IonRadioGroup, IonRadio, IonList, IonItem} from '@ionic/react';
import PageHeader2 from "../../components/PageHeader2";
import parseReferenceString from "./parseReferenceString";
import PassageResults from "./PassageResults";
import "./BrowsePassage.css";
import InputDisplay from "./InputDisplay";

export default function BrowsePassage({pkState, navState}) {

    const [reference, setReference] = useState('3JN 1:1-3');
    const [parsedReference, setParsedReference] = useState('3JN 1:1-3');
    const [parseResult, setParseResult] = useState({});
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
            <PageHeader2 title="Select Passage" />
            <IonContent>
                <IonList>
                    <IonItem>
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
                    <IonRadioGroup value={displayMode} onIonChange={e => setDisplayMode(e.detail.value)}>
                            <IonItem>
                                <IonLabel>One Version</IonLabel>
                                <IonRadio value="versesForOneVersion" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>By Version</IonLabel>
                                <IonRadio value="versesByVersion" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>By Verse</IonLabel>
                                <IonRadio value="versesByVerse" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Blocks For One Version</IonLabel>
                                <IonRadio value="blocksForOneVersion" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Blocks By Version</IonLabel>
                                <IonRadio value="blocksByVersion" />
                            </IonItem>
                    </IonRadioGroup>
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
