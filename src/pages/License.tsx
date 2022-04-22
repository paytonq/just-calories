// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { gplText } from './aboutUtils';
import './License.css';

const License: React.FC = () => {
  return (
    <IonPage>
      <IonContent class="licenseContent">
        <pre>
          {gplText}
        </pre>
      </IonContent>
    </IonPage>
  );
};

export default License;
