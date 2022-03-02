import React from "react";
import PropTypes from "prop-types";
import { useCatalog } from "proskomma-react-hooks";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import PkDataAsJson from "../../components/PkDataAsJson";
import PkErrors from "../../components/PkErrors";
import "./Versions.css";

export default function Versions({ pkState, navState, setNavState }) {
  const { catalog, errors: catalogErrors } = useCatalog({
    proskomma: pkState.proskomma,
    stateId: pkState.stateId,
    verbose: true,
  });
  console.log(catalog);

  return (
    <IonPage>
      <PageHeader
        title="List Versions"
        navState={navState}
        setNavState={setNavState}
      />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <PkDataAsJson data={catalog} />
            </IonCol>
          </IonRow>
          {catalogErrors && catalogErrors.length > 0 && (
            <IonRow>
              <IonCol>
                <PkErrors errors={catalogErrors} />
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

Versions.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};