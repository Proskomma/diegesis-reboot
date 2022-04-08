import React, {useEffect} from 'react';
import {
    IonApp,
    setupIonicReact,
} from '@ionic/react';
import {useProskomma, useCatalog} from 'proskomma-react-hooks';
import {nt_ebible_27book as frozen} from 'proskomma-frozen-archives';
import {thaw} from 'proskomma-freeze';

import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {useState} from 'react';
import SideMenu from "./components/SideMenu";
import Browse from "./components/Browse";

import {AppLangProvider} from './contexts/AppLang';

setupIonicReact();

const App = () => {

    const initialState = {
        docSetId: 'xyz-fra_lsg',
        bookCode: '3JN',
        chapter: 1,
        verse: 1,
    };
    const [navState, setNavState] = useState(initialState);
    const [appLanguage, setAppLanguage] = useState("en");

    const verbose = true;
    const pkState = useProskomma({verbose});

    useEffect(() => {
        thaw(pkState.proskomma, frozen).then(() => {
            console.log('thawed');
            pkState.newStateId();
        });
    }, [pkState.proskomma]);

    const {catalog} = useCatalog({
        ...pkState,
        verbose: true,
        cv: true,
    });

    return (
        <IonApp>
            <AppLangProvider value={appLanguage}>
                <SideMenu catalog={catalog} pkState={pkState} navState={navState} setNavState={setNavState} appLanguage={appLanguage} setAppLanguage={setAppLanguage} />
                <Browse pkState={pkState} navState={navState} catalog={catalog} />
            </AppLangProvider>
        </IonApp>
    );
};

export default App;
