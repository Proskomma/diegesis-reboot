import React, { useEffect } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { useProskomma, useCatalog } from "proskomma-react-hooks";

import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
/* Theme variables */
import "./theme/variables.css";
import { useState } from "react";
import SideMenu from "./components/SideMenu";
import Browse from "./components/Browse";
import succinct from "./defaultBible/engkjvcpb/succinct.json"; 
import { AppLangProvider } from "./contexts/AppLang";


setupIonicReact();

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:1234/graphql",
    cache: new InMemoryCache(),
  });

  const initialState = {
    docSetId: "eBible/eng_KJVluk",
    bookCode: "LUK",
    chapter: 1,
    verse: 1,
  };
  const verbose = true;
  const [navState, setNavState] = useState(initialState);
  const [appLanguage, setAppLanguage] = useState("en");
  console.log(navState)
  const pkState = useProskomma({ verbose });

  useEffect(() => {
    pkState.proskomma.loadSuccinctDocSet(succinct);
    pkState.newStateId();
  },[]);

  const catalog = useCatalog({
    ...pkState,
    verbose: true,
    cv: true,
  }).catalog;

  
  return (
    <ApolloProvider client={client}>
      <IonApp>
        <AppLangProvider value={appLanguage}>
              <SideMenu
                catalog={catalog}
                pkState={pkState}
                navState={navState}
                setNavState={setNavState}
                appLanguage={appLanguage}
                setAppLanguage={setAppLanguage}
                client={client}
              />
              <Browse  pkState={pkState} navState={navState} catalog={catalog} />
        </AppLangProvider>
      </IonApp>
    </ApolloProvider>
  );
};

export default App;
