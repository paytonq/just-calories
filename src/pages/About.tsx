// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './About.css';

const About: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
          <br />
          Just Calories is licensed under the GNU General Public License version 3. 
          <br />
          <IonButton routerLink="/license">View License</IonButton>
          <br />
          <IonButton href="https://github.com/paytonq/just-calories">View Source Code</IonButton>
          <hr />
          Just Calories is made possible by the following software.
          <br />
          <IonButton routerLink="/thirdparty">View Third Party Licenses</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default About;
