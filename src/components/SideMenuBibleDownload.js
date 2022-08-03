import {
  IonAccordion,
  IonList,
  IonItem,
  IonLabel,
  IonAccordionGroup,
  IonText,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { gql, useQuery as uQ } from "@apollo/client";
import { downloadOutline, trashOutline } from "ionicons/icons";
import PropTypes from "prop-types";
import "./DownloadAccordion.css";

export default function SideMenuBibleDownload({ catalog, pkState }) {
  const [docSets, setDocSet] = useState(new Set());
  useEffect(() =>{
  setDocSet(new Set())
  catalog?.docSets.map(dS => {docSets.add(dS.id)})},[pkState])
  catalog?.docSets.map(dS => {docSets.add(dS.id)})

  const { loading, error, data } = uQ(
    gql`
      query {
        orgs {
          name
          localTranslations {
            id
            title
            hasSuccinct
            languageCode
            abbreviation
            succinct
          }
        }
      }
    `,
    { pollInterval: 10000 }
  );
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    
      <IonItem class="IonAcordionSizePanel">
        <IonContent fullscreen="true">
        <IonAccordionGroup expand="inset">
          {data.orgs.map((org) => {
            return org.localTranslations.map((lT,id) => {
              const inIt = docSets.has(`${org.name}/${lT.languageCode}_${lT.abbreviation}`);
              return(
                <IonAccordion key={id}>
                  <IonItem slot="header" >
                    <IonLabel>
                      {`${lT.abbreviation}`}
                    </IonLabel>
                  </IonItem>

                  <IonList slot="content">
                    <IonList>
                      <IonItem>
                        <IonLabel
                          class="ion-title"
                          align="center"
                          type="dark"
                          size="large"
                        >
                          Title
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonText>{lT.title}</IonText>
                      </IonItem>
                    </IonList>

                    <IonItem>
                      <IonLabel>ID</IonLabel>
                      <IonText>{lT.id}</IonText>
                    </IonItem>

                    <IonItem>
                      <IonLabel>Language</IonLabel>
                      <IonText>{lT.languageCode}</IonText>
                    </IonItem>

                    <IonItem>
                      <IonButton
                        align="center"
                        onClick={() => {
                          if (docSets.has(`${org.name}/${lT.languageCode}_${lT.abbreviation}`)) {
                            pkState.proskomma.gqlQuerySync(
                              `mutation { deleteDocSet(docSetId: "${org.name}/${lT.languageCode}_${lT.abbreviation}") }`
                              
                            );
                            docSets.delete(`${org.name}/${lT.languageCode}_${lT.abbreviation}`)
                            pkState.newStateId();

                          } else {
                            const docs = JSON.parse(lT.succinct);
                            pkState.proskomma.loadSuccinctDocSet(docs);
                            pkState.newStateId();
                            console.log("working!");
 
                          }
                        }}
                      >
                        <IonIcon icon={inIt ? trashOutline : downloadOutline} />
                      </IonButton>
                    </IonItem>
                  </IonList>
                </IonAccordion>
              );
            });
          })}
        </IonAccordionGroup>
        </IonContent>
      </IonItem>
      
      
  );
}
SideMenuBibleDownload.propTypes = {
  pkState: PropTypes.object.isRequired,
  catalog : PropTypes.object.isRequired,


};
