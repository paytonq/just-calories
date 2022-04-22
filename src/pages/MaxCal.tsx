// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { useEffect, useState } from 'react';
import { maxCalKey, MaxValProps } from '../App';
import { initalizeStorage } from '../storageUtils';

const handleUpdateMaxCal = async (
      maxCal: string | null | undefined, 
      myDB: Storage | undefined, 
      setMaxValue: React.Dispatch<React.SetStateAction<number>> | undefined,
      present: (message: string, duration?: number) => Promise<void>) => {
  if (!myDB) {
    return;
  }

  if (maxCal) {
    const maxCalVal = parseInt(maxCal, 10);
    if(!isNaN(maxCalVal)) {
      if (maxCalVal <= 9999 && maxCalVal >= 0) {
        myDB.set(maxCalKey, maxCalVal.toString());
        setMaxValue && setMaxValue(maxCalVal);
      } else {
        present("Value must be between 0 and 9999", 3000);
      }
    }
  }
}

const MaxCal: React.FC<MaxValProps> = (props: MaxValProps) => {
  const [ myDB, setMyDB ] = useState<Storage>();
  const [ present ] = useIonToast();
  useEffect(() => initalizeStorage(myDB, setMyDB), [myDB]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maximum Calories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonItem>
            <IonInput 
              type="number" 
              value={props.maxValue} 
              placeholder="Enter maximum calories" 
              onIonChange={async (e) => await handleUpdateMaxCal(e.detail.value, myDB, props.setMaxValue, present)}
            />
          </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MaxCal;
