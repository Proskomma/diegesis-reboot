import React, { useState, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonTextarea
} from "@ionic/react";
import i18n from "../lib/i18n";
import makeReference from "./makeReference";
import AppLangContext from "../contexts/AppLang";
import NSearchResultRow from "./NSearchResultRow";
import {
  queryStringBookSet1,
  queryStringPassage1,
  queryStringPassagesByBookCodes1,
} from "./Query";
import lightRegexCode from "./regex";
import "./DownloadAccordion.css";
export default function SideMenuSearch({ pkState, navState, setNavState }) {
  const appLang = useContext(AppLangContext);
  const [displayMode, setDisplayMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allChars, setAllChars] = useState(false);
  const [actualBookCode, setActualBookCode] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => (x = x + 1), 0);
  const [matchedString, setMatchedString] = useState("");
  const [wordMatched] = useState([]);
  const [displaySearchText, setDisplaySearchText] = useState("");
  const [search, setSearch] = useState(false);
  let queryStringBookSet = queryStringBookSet1;
  const queryStringPass = queryStringPassage1;
  const queryStringPassagesByBookCodes = queryStringPassagesByBookCodes1;

  useEffect(() => {
    setData([]);
    wordMatched.length = 0;
    setSearchText(textModification(lightRegexCode(displaySearchText)));
    if (searchText !== "" && search) {
      queryStringBookSet = queryStringBookSet.replace("[%Jesus%]", searchText);

      if (allChars) {
        queryStringBookSet = queryStringBookSet.replace(
          "allChars: false",
          "allChars: true"
        );
      }
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
      queryStringBookSet = queryStringBookSet.replace(searchText, "[%Jesus%]");
    }
    setSearch(false);
  }, [displaySearchText, search, displayMode]);

  useEffect(() => {
    if (actualBookCode.length !== 0 && searchText !== [""]) {
      find_text();
    }
  }, [actualBookCode]);

  function textModification(text) {
    const t = text.split(" ");
    let matchedStringBeforeWork = text
      .split(" ")
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue + "|",
        ""
      );

    matchedStringBeforeWork = matchedStringBeforeWork.substring(
      0,
      matchedStringBeforeWork.length - 1
    );
    setMatchedString(matchedStringBeforeWork);
    if (t.length > 1) {
      setAllChars(true);
      let str = "[";
      t.map((text) => {
        str = `${str}"${text}",`;
      });
      str = str.substring(0, str.length - 2);
      str = str = `${str}"`;
      str = str = `${str}]`;
      return str;
    } else {
      setAllChars(false);
      return `["${text}"]`;
    }
  }

  function find_text() {
    const bookCode = actualBookCode.shift();

    let queryStringPassage = queryStringPass;
    if (displayMode) {
      queryStringPassage = queryStringPassagesByBookCodes;
    }
    if (allChars) {
      queryStringPassage = queryStringPassage.replace(
        "allChars:false",
        "allChars:true"
      );
    }

    queryStringPassage = queryStringPassage.replace(
      "%setID%",
      `"${navState.docSetId}"`
    );
    queryStringPassage = queryStringPassage.replace(
      "%bookID%",
      `"${bookCode}"`
    );
    // when adding LightReg replace searchText.split(" ") with words
    queryStringPassage = queryStringPassage.replace("[%Jesus%]", searchText);

    queryStringPassage = queryStringPassage.replace("%Jesus%", matchedString);
    queryStringPassage = queryStringPassage.replace("%Jesus%", matchedString);
    console.log(matchedString)
    pkState.proskomma
      .gqlQuerySync(queryStringPassage)
      .data.docSet.matches.map((matched) => wordMatched.push(matched.matched));
    console.log(wordMatched);
    let data2 = data;

    if (displayMode) {
      pkState.proskomma
        .gqlQuerySync(queryStringPassage)
        .data.docSet.document.mainSequence.blocks.map((cM) => {
          const a = makeReference(bookCode, cM.scopeLabels, displayMode);
          const b = cM.text;
          const element = { text: b, reference: a };
          data2.push(element);
        });
    } else {
      pkState.proskomma
        .gqlQuerySync(queryStringPassage)
        .data.docSet.document.cvMatching.map((cM) => {
          const a = makeReference(bookCode, cM.scopeLabels, displayMode);
          const b = cM.text;
          const element = { text: b, reference: a };
          data2.push(element);
        });
    }
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
      <IonItem class="search">
        <IonTextarea
        autoGrow={true}
          value={displaySearchText}
          onIonChange={(e) => {
            setDisplaySearchText(e.target.value);
            setInfiniteDisabled(false);
          }}
        ></IonTextarea>
        </IonItem>
        <IonButton
          key={1}
          onClick={() => {
            setSearch(true);
          }}
        >
          {"Search"}
        </IonButton>
      </IonItem>
      <IonItem>
        <IonButton key={2} onClick={() => setDisplaySearchText("WORDS_WITH()")}>
          {"W_with"}
        </IonButton>
      </IonItem>
      <IonItem>
        <IonLabel position="relative">{i18n(appLang, "show_blocks")}</IonLabel>
        <IonToggle
          slot="end"
          onIonChange={() => setDisplayMode(!displayMode)}
        ></IonToggle>
      </IonItem>
      <IonList>
        {data.map((d, id) => {
          return (
            <IonItem key={id}>
              <NSearchResultRow
                p={d}
                n={id}
                wordMatched={wordMatched}
                navState={navState}
                setNavState={setNavState}
                searchText={searchText}
              />
            </IonItem>
          );
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
