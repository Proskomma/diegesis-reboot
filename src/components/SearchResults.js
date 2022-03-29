import React from "react";
import PropTypes from "prop-types";
import {IonItem, IonText} from "@ionic/react";
import SearchResultRow from "./SearchResultRow";

export default function SearchResults({p, searchText}) {

    if (!searchText) {
        return <IonItem>
                   <IonText>Please enter some search text</IonText>
               </IonItem>;
    } else if (p.length < 1) {
        return <IonItem>
                   <IonText>No text found</IonText>
               </IonItem>;
    } else {
        return p.map((p, n) => <SearchResultRow p={p} n={n} key={n} />)
    }
}

SearchResults.propTypes = {
    p: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
};