// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';
import { cogOutline, restaurantOutline } from 'ionicons/icons';
import Calories from './pages/Calories';
import Settings from './pages/Settings';

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
import React, { useEffect, useState } from 'react';
import MaxCal from './pages/MaxCal';
import AddCal from './pages/AddCal';
import About from './pages/About';
import License from './pages/License';
import ThirdParty from './pages/ThirdParty';
import { initalizeStorage } from './storageUtils';

setupIonicReact();

export const maxCalKey = "MAX_CAL";
export const curCalKey = "CUR_CAL";
export const curDateKey = "CUR_DATE";

export interface MaxValProps {
  maxValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
}

export interface CurValProps {
  curValue: number;
  setCurValue: React.Dispatch<React.SetStateAction<number>>;
}


const App: React.FC = () => {

  const [ maxValue, setMaxValue ] = useState<number>(0);
  const [ curValue, setCurValue ] = useState<number>(0);
  
  const [ myDB, setMyDB ] = useState<Storage>();
  useEffect(() => initalizeStorage(myDB, setMyDB), [myDB]);
  const dateOnOpen = new Date("2022-04-26T01:11:33.020Z");
  if (myDB) {
    myDB.get(curDateKey).then((curDate: Date) => {
        if(!curDate || dateOnOpen.getFullYear() !== curDate.getFullYear() ||
          dateOnOpen.getMonth() !== curDate.getMonth() ||
          dateOnOpen.getDay() !== curDate.getDay()) {
            myDB.set(curDateKey, dateOnOpen).then(() => {
              myDB.set(curCalKey, 0).then(() => {
                setCurValue(0);
              });
            })
        }
    })
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/calories">
              <Calories maxValue={maxValue} setMaxValue={setMaxValue} curValue={curValue} setCurValue={setCurValue}/>
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/maxcal">
              <MaxCal maxValue={maxValue} setMaxValue={setMaxValue} />
            </Route>
            <Route exact path="/addcal">
              <AddCal curValue={curValue} setCurValue={setCurValue} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/license">
              <License />
            </Route>
            <Route exact path="/thirdparty">
              <ThirdParty />
            </Route>
            <Route exact path="/">
              <Redirect to="/calories" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="calories" href="/calories">
              <IonIcon icon={restaurantOutline} />
              <IonLabel>Calories</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={cogOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
