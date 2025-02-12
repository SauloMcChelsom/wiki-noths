import { eStorageStrategy } from '@core/infra/storage/enums/storage.enum';

export const environment = {
  production: false,
  domain: 'localhost',
  protocol: 'http://',
  version: '/v1',
  preview: '/private',
  port: ':4200',

  payloadStorage: {
    currentUser: {
      encryptionKey: '', //'5a203b97-53d6-406a-9909-89883e217abb',
      tableName: 'current-user',
      stateKey: '0242ac120003',
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
    userMock: {
      encryptionKey: '', //'5a203b97-53d6-406a-9909-89883e217abb',
      tableName: 'user-mock-datasource',
      stateKey: '0242ac120003',
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
    noteMock: {
      encryptionKey: '', //'5a203b97-53d6-406a-9909-89883e217abb',
      tableName: 'note-mock-datasource',
      stateKey: '0242ac120003',
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
    noteTable: {
      encryptionKey: '', //'5a203b97-53d6-406a-9909-89883e217abb',
      tableName: 'note-nosql-database-in-memory',
      stateKey: '0242ac1200013',
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
    systemLanguage: {
      encryptionKey: '', //'5a203b97-53d6-406a-9909-89883e217abb',
      tableName: 'current-system-language',
      stateKey: '0242ac120003',
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
    authorization: {
      encryptionKey: '', //'5a203b97-53d6-406a-9909-89883e217abb',
      tableName: 'authorization',
      stateKey: '0242ac120003',
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
  },
};
