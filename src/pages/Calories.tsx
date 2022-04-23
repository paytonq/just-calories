// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Storage } from '@ionic/storage';
import './Calories.css';
import 'react-circular-progressbar/dist/styles.css';
import { curCalKey, CurValProps, maxCalKey, MaxValProps } from '../App';
import { useEffect, useState } from 'react';
import { initalizeStorage } from '../storageUtils';
import { add } from 'ionicons/icons';

const Calories: React.FC<MaxValProps & CurValProps> = (props: MaxValProps & CurValProps) => {
  const [ myDB, setMyDB ] = useState<Storage>();

  useEffect(() => initalizeStorage(myDB, setMyDB), [myDB]);

  if (myDB) {
    if (!props.maxValue) {
      myDB.get(maxCalKey).then((maxCal: string) => {
        const newMaxCal = parseInt(maxCal, 10);
        if(!isNaN(newMaxCal)) {
          props.setMaxValue && props.setMaxValue(newMaxCal);
        }
      })
    }


    if (!props.curValue) {
      myDB.get(curCalKey).then((curCal: string) => {
        const newCurCal = parseInt(curCal, 10);
        if(!isNaN(newCurCal)) {
          props.setCurValue && props.setCurValue(newCurCal);
        }
      })
    }
  }

  return (
    <IonPage>
      <IonContent className="loading-container">
          { props.curValue !== null && props.curValue !== undefined && props.maxValue 
          ? <CircularProgressbar
            className="svg-element" 
            value={props.curValue} 
            maxValue={props.maxValue} 
            text={props.maxValue ? `${props.curValue} / ${props.maxValue}` : "Error" } />
          : <span className="notice-text">Set maximum calories in settings.</span>}
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton routerLink="/addcal">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Calories;
