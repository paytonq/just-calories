// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { attributionText } from './aboutUtils';
import './ThirdParty.css';

const ThirdParty: React.FC = () => {
  return (
    <IonPage>
      <IonContent class="attributionContent">
        <pre>
          {attributionText}
        </pre>
      </IonContent>
    </IonPage>
  );
};

export default ThirdParty;
