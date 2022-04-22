// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { IonButton, IonContent, IonInput, IonItem, IonPage, NavContext, useIonToast } from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { curCalKey, CurValProps } from '../App';
import { initalizeStorage } from '../storageUtils';
import './AddCal.css';

const handleAddCal = async (
    addVal: string | null | undefined, 
    myDB: Storage | undefined, 
    setCurValue: React.Dispatch<React.SetStateAction<number>> | undefined,
    present: (message: string, duration?: number) => Promise<void>) => {
  if (!myDB) {
    return;
  }

  if (addVal) {
    const addCalVal = parseInt(addVal, 10);

    if(!isNaN(addCalVal)) {
      myDB.get(curCalKey).then((oldVal: string) => {
        let oldValAsNum = 0;
        if (oldVal) {
          oldValAsNum = parseInt(oldVal, 10);
        }
        const newVal = oldValAsNum + addCalVal;
        if(!isNaN(newVal) && newVal <= 9999 && newVal >= 0) {
          myDB.set(curCalKey, newVal.toString());
          setCurValue && setCurValue(newVal);
        } else {
          present("Invalid value", 3000);
        }
      });
    }
  }
}

const AddCal: React.FC<CurValProps> = (props: CurValProps) => {
  const [ addValue, setAddValue ] = useState<string>("");
  const [ myDB, setMyDB ] = useState<Storage>();
  const [ present ] = useIonToast();

  useEffect(() => initalizeStorage(myDB, setMyDB), [myDB]);

  const { navigate } = useContext(NavContext);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddCal(addValue, myDB, props.setCurValue, present);
    navigate("/calories", "back");
  }

  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <form className="addCalForm" onSubmit={handleSubmit}>
            <IonInput 
              type="number" 
              value={addValue} 
              placeholder="Number of calories to add" 
              onIonChange={(e) => e.detail.value && setAddValue(e.detail.value)} 
            />
            <IonButton type="submit">Add</IonButton>
          </form>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddCal;
