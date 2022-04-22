// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { Drivers, Storage} from "@ionic/storage";

export const initalizeStorage = (myDB: Storage | undefined, setMyDB: React.Dispatch<React.SetStateAction<Storage | undefined>>) => {
  if (!myDB) {
    const store = new Storage({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB]
    });

    store.create().then(
      (newStore: Storage) => {
        setMyDB(newStore);
      }
    );
  }
}
