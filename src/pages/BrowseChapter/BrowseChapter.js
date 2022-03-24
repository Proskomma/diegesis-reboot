import React from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from '@ionic/react';
import FormattedParagraph from "./FormattedParagraph";
import PageHeader from "../../components/PageHeader";

import "./BrowseChapter.css";

export default function BrowseChapter({pkState, navState, setNavState, catalog}) {
    const getBBCQuery = (navState) => {
        const query = '{' +
            '  docSet(id:"%docSetId%") {' +
            '    id' +
            '    document(bookCode:"%bookCode%") {' +
            '      mainSequence {' +
            '        blocks(withScriptureCV:"%chapter%") {' +
            '           scopeLabels(startsWith:["blockTag"])' +
            '            items{type subType payload}' +
            '       }' +
            '      }' +
            '    }' +
            '  }' +
            '}';
        return query
            .replace("%docSetId%", navState.docSetId)
            .replace("%bookCode%", navState.bookCode)
            .replace("%chapter%", navState.chapter);
    };

    const verbose = true;

    const queryState = useQuery({
        ...pkState,
        query: getBBCQuery(navState),
        verbose,
    });

    return (
        <IonPage>
            <PageHeader title="Browse Chapter" navState={navState} setNavState={setNavState} catalog={catalog} />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {
                                queryState.data.docSet?.document?.mainSequence?.blocks
                                    .map((b, n) => <FormattedParagraph block={b} n={n} key={n} />)
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowseChapter.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
