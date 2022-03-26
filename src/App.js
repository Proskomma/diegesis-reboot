import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {useProskomma} from 'proskomma-react-hooks';
import {reader, book, search} from 'ionicons/icons';
import BrowseBook from './pages/BrowseBook/BrowseBook';
import BrowsePassage from './pages/BrowsePassage/BrowsePassage';
import Search from './pages/Search/Search';
import {nt_ebible_27book as frozen} from 'proskomma-frozen-archives';
import {useCatalog} from 'proskomma-react-hooks';
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
import SideMenuNavigation from "./components/SideMenuNavigation";

setupIonicReact();

const App = () => {
    const initialState = {
        docSetId: 'xyz-fra_lsg',
        bookCode: '3JN',
        chapter: 1,
        verse: 1,
    };
    const [navState, setNavState] = useState(initialState);

    const verbose = true;
    const pkState = useProskomma({verbose});

    useEffect(() => {
        thaw(pkState.proskomma, frozen).then(() => {
            console.log('thawed');
            pkState.newStateId();
        });
    }, [pkState.proskomma]);

    const {catalog} = useCatalog({
        proskomma: pkState.proskomma,
        stateId: pkState.stateId,
        verbose: true,
        cv: true,
    });

    return (
        <IonApp>
            <SideMenuNavigation catalog={catalog} navState={navState} setNavState={setNavState} />
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet id="main">
                        <Route path="/tabs/browseBook">
                            <BrowseBook
                                catalog={catalog}
                                navState={navState}
                                setNavState={setNavState}
                                pkState={pkState}
                            />
                        </Route>
                        <Route path="/tabs/browsePassage">
                            <BrowsePassage
                                catalog={catalog}
                                pkState={pkState}
                                navState={navState}
                                setNavState={setNavState}
                            />
                        </Route>
                        <Route path="/tabs/search">
                            <Search
                                catalog={catalog}
                                pkState={pkState}
                                navState={navState}
                                setNavState={setNavState}
                            />
                        </Route>
                        <Route exact path="/" >
                            <Redirect to="/tabs/browsePassage" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton
                            tab="browseBook"
                            href="/tabs/browseBook"
                            data-test-id="tab-bar-button-tab1"
                        >
                            <IonIcon icon={book} />
                            <IonLabel>Book</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="browsePassage"
                            href="/tabs/browsePassage"
                            data-test-id="tab-bar-button-tab2"
                        >
                            <IonIcon icon={reader} />
                            <IonLabel>Passage</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="search"
                            href="/tabs/search"
                            data-test-id="tab-bar-button-tab3"
                        >
                            <IonIcon icon={search} />
                            <IonLabel>Search</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
