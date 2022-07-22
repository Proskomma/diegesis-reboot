import React, { useState, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  IonList,
  IonItem,
  IonSearchbar,
  IonLabel,
  IonToggle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import i18n from "../lib/i18n";
import makeReference from "./makeReference";
import AppLangContext from "../contexts/AppLang";
import NSearchResultRow from "./NSearchResultRow";
import{ queryStringBookSet1, queryStringPassage1, queryStringPassagesByBookCodes1 } from "./Query";

export default function SideMenuSearch({ pkState, navState, setNavState }) {
  const appLang = useContext(AppLangContext);
  const [displayMode, setDisplayMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [actualBookCode, setActualBookCode] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => (x = x + 1), 0);
  console.log(ignored)
  
  let queryStringBookSet = queryStringBookSet1;
  const queryStringPass = queryStringPassage1;
  const queryStringPassagesByBookCodes = queryStringPassagesByBookCodes1;

  useEffect(() => {
    setData([]);
    queryStringBookSet = queryStringBookSet.replace("%Jesus%", searchText);

    const bookSetsResult =
      pkState.proskomma.gqlQuerySync(queryStringBookSet).data;

    let bookCodesArray = [];
    bookSetsResult.docSets.map((dS) => {
      if (dS.id === navState.docSetId) {
        dS.documents.map((docts) => {
          bookCodesArray = [...bookCodesArray, docts.bookCode];
        });
      }
    });
    setActualBookCode(bookCodesArray);
    queryStringBookSet = queryStringBookSet.replace(searchText, "%Jesus%");
  }, [searchText,displayMode]);

  useEffect(() => {
    if (actualBookCode.length !== 0 && searchText !== "") {
      find_text();
    }
  }, [actualBookCode]);



  

  function find_text() {
    const bookCode = actualBookCode.shift();
    let queryStringPassage = queryStringPass
    if(displayMode){
      queryStringPassage = queryStringPassagesByBookCodes
    }

      console.log(queryStringPassage)
      queryStringPassage = queryStringPassage.replace(
        "%setID%",
        `"${navState.docSetId}"`
      );
      queryStringPassage = queryStringPassage.replace(
        "%bookID%",
        `"${bookCode}"`
      );
      queryStringPassage = queryStringPassage.replace("%Jesus%", searchText);
      queryStringPassage = queryStringPassage.replace("%Jesus%", searchText);

      console.log(queryStringPassage)
      let data2 = data;
      if(displayMode){
        pkState.proskomma
        .gqlQuerySync(queryStringPassage)
        .data.docSet.document.mainSequence.blocks.map((cM) => {
          const a = makeReference(bookCode, cM.scopeLabels,displayMode);
          const b = cM.text;
          const element = { text: b, reference: a};
          data2.push(element);
        });
      }
      else{
      pkState.proskomma
        .gqlQuerySync(queryStringPassage)
        .data.docSet.document.cvMatching.map((cM) => {
          const a = makeReference(bookCode, cM.scopeLabels,displayMode);
          const b = cM.text;
          const element = { text: b, reference: a};
          data2.push(element);
        });
      }
      console.log(data2);
      setData(data2);
      forceUpdate();
  }


  const loadData = (ev) => {
    console.log("loading data");
    find_text();
    ev.target.complete();
    if (actualBookCode.length === 0) {
      console.log("here");
      setInfiniteDisabled(true);
    }
  };

  return (
    <IonList>
      <IonItem>
        <IonSearchbar
          value={searchText}
          size="small"
          onIonChange={(e) => {
            setSearchText(e.target.value);
            setInfiniteDisabled(false);
          }}
          debounce={2000}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="relative">{i18n(appLang, "show_blocks")}</IonLabel>
        <IonToggle
          slot="end"
          onIonChange={() => 
            setDisplayMode(!displayMode)
          }
        ></IonToggle>
      </IonItem>
      <IonList>
        {data.map((d, id) => {  
          return (
            <IonItem key={id}>
            <NSearchResultRow
              p={d}
              n={id}
              navState={navState}
              setNavState={setNavState}
            />
          </IonItem>);
        })}
        
      </IonList>

      <IonInfiniteScroll
        onIonInfinite={loadData}
        threshold={"10%"}
        disabled={isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonList>
  );
}

SideMenuSearch.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};
