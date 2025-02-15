import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StoreService } from './store.service';
import { StorageLocalService } from '@core/infra/storage/services/storage-local.service';
import { StorageSessionService } from '@core/infra/storage/services/storage-session.service';
import { CryptoService } from '@core/infra/crypto/services/crypto.service';
import { AppState } from '../interfaces/state.model';
import { BehaviorSubject, take } from 'rxjs';
import { eStorageStrategy } from '@core/infra/storage/enums/storage.enum';
import { eLoadingState } from '../enums/state.enum';
import { environment } from 'src/assets/environments/enviroment';

describe('StoreService', () => {
  let service: StoreService<any>;
  let storageLocalService: jasmine.SpyObj<StorageLocalService<any>>;
  let storageSessionService: jasmine.SpyObj<StorageSessionService<any>>;
  let cryptoService: jasmine.SpyObj<CryptoService<any>>;

  beforeEach(() => {
    const storageLocalSpy = jasmine.createSpyObj('StorageLocalService', [
      'save',
      'delete',
    ]);
    const storageSessionSpy = jasmine.createSpyObj('StorageSessionService', [
      'save',
      'delete',
    ]);
    const cryptoSpy = jasmine.createSpyObj('CryptoService', [
      'encrypt',
      'decrypt',
    ]);

    TestBed.configureTestingModule({
      providers: [
        StoreService,
        { provide: StorageLocalService, useValue: storageLocalSpy },
        { provide: StorageSessionService, useValue: storageSessionSpy },
        { provide: CryptoService, useValue: cryptoSpy },
      ],
    });

    service = TestBed.inject(StoreService);
    storageLocalService = TestBed.inject(StorageLocalService) as jasmine.SpyObj<
      StorageLocalService<any>
    >;
    storageSessionService = TestBed.inject(
      StorageSessionService
    ) as jasmine.SpyObj<StorageSessionService<any>>;
    cryptoService = TestBed.inject(CryptoService) as jasmine.SpyObj<
      CryptoService<any>
    >;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar o estado corretamente', (done) => {
    const initialState: AppState<any> = {
      items: [
        {
          title: 'estamos on-line',
          text: 'estamos on-line',
          current_position: 1,
          is_favorite: false,
          uid: '9af46866-0545-4474-b7f8-977158904f63',
          link: 'estamos-on-line',
          timestamp:
            'Wed Dec 11 2024 16:58:31 GMT-0300 (Hora padrão de Brasília)',
        },
      ],
      callState: eLoadingState.INIT,
      storage: {
        encryptionKey: environment.payloadStorage.systemLanguage.encryptionKey,
        tableName: environment.payloadStorage.systemLanguage.tableName,
        storageStrategy:
          environment.payloadStorage.systemLanguage.storageStrategy,
      },
    };

    service.initialState(initialState).subscribe((state) => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('deve salvar o estado corretamente', (done) => {
    const initialState: AppState<any> = {
      items: [],
      callState: eLoadingState.INIT,
      storage: {
        encryptionKey: environment.payloadStorage.systemLanguage.encryptionKey,
        tableName: environment.payloadStorage.systemLanguage.tableName,
        storageStrategy:
          environment.payloadStorage.systemLanguage.storageStrategy,
      },
    };

    service.initialState(initialState).subscribe({});
    const updatedState: AppState<any> = {
      ...initialState,
      items: [{ id: 1, name: 'Novo Item' }],
    };

    storageLocalService.save.and.returnValue(true);
    service
      .save(() => updatedState)
      .subscribe((result) => {
        expect(result).toBeTrue();
        done();
      });
  });

  it('deve excluir o estado corretamente', (done) => {
    const initialState: AppState<any> = {
      items: [{ id: 1, name: 'Item 1' }],
      callState: eLoadingState.INIT,
      storage: {
        encryptionKey: environment.payloadStorage.systemLanguage.encryptionKey,
        tableName: environment.payloadStorage.systemLanguage.tableName,
        storageStrategy:
          environment.payloadStorage.systemLanguage.storageStrategy,
      },
    };

    service.initialState(initialState).subscribe({});

    storageLocalService.delete.and.returnValue(true);

    service.delete().subscribe((result) => {
      expect(result).toBeTrue();
      expect(storageLocalService.delete).toHaveBeenCalledWith(
        environment.payloadStorage.systemLanguage.tableName
      );
      done();
    });
  });

  it('deve persistir o estado corretamente no localStorage', (done) => {
    const state: AppState<any> = {
      items: [{ id: 1, name: 'Item 1' }],
      callState: eLoadingState.INIT,
      storage: {
        tableName: 'test',
        storageStrategy: eStorageStrategy.LOCAL_STORAGE,
        encryptionKey: '',
      },
    };

    storageLocalService.save.and.returnValue(true);

    service['persistState'](state).subscribe((result) => {
      expect(result).toBeTrue();
      expect(storageLocalService.save).toHaveBeenCalledWith('test', state);
      done();
    });
  });

  it('deve persistir o estado corretamente no sessionStorage', (done) => {
    const state: AppState<any> = {
      items: [{ id: 1, name: 'Item 1' }],
      callState: eLoadingState.INIT,
      storage: {
        tableName: 'test',
        storageStrategy: eStorageStrategy.SESSION_STORAGE,
        encryptionKey: '',
      },
    };

    storageSessionService.save.and.returnValue(true);

    service['persistState'](state).subscribe((result) => {
      expect(result).toBeTrue();
      expect(storageSessionService.save).toHaveBeenCalledWith('test', state);
      done();
    });
  });

  it('deve limpar o storage corretamente', (done) => {
    const state: AppState<any> = {
      items: [{ id: 1, name: 'Item 1' }],
      callState: eLoadingState.INIT,
      storage: {
        tableName: 'test',
        storageStrategy: eStorageStrategy.LOCAL_STORAGE,
        encryptionKey: '',
      },
    };
    service.initialState(state).subscribe({});
    storageLocalService.delete.and.returnValue(true);

    service['clearStorage']().subscribe((result) => {
      expect(result).toBeTrue();
      expect(storageLocalService.delete).toHaveBeenCalledWith('test');
      done();
    });
  });

  it('deve descriptografar dados armazenados se houver chave de criptografia', () => {
    const state: AppState<any> = {
      items: [{ id: 1, name: 'Item 1' }],
      callState: eLoadingState.INIT,
      storage: {
        tableName: environment.payloadStorage.systemLanguage.tableName,
        storageStrategy: eStorageStrategy.LOCAL_STORAGE,
        encryptionKey: '123',
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return 'encryptedData';
    });

    cryptoService.decrypt.and.returnValue(state);

    // Forçar o estado antes de chamar getFromStorage()
    (service as any).stateStore = new BehaviorSubject<AppState<any> | null>(
      state
    );

    const result = (service as any).getFromStorage();

    expect(cryptoService.decrypt).toHaveBeenCalledWith('encryptedData', '123');
    expect(result).toEqual(state);
  });

  it('deve retornar null se não houver dados armazenados', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simula ausência de dados no localStorage
    spyOn(sessionStorage, 'getItem').and.returnValue(null); // Simula ausência de dados no sessionStorage

    const result = service['getFromStorage']();

    expect(result).toBeNull();
  });

  it('deve retornar os resultados filtrados corretamente [LOCAL_STORAGE] [encryptionKey=false]', fakeAsync(() => {
    const state: AppState<any> = {
      items: [
        {
          language: 'portuguese',
          prefix: 'pt-BR',
        },
      ],
      callState: eLoadingState.INIT,
      storage: {
        tableName: 'table-laguage',
        storageStrategy: eStorageStrategy.LOCAL_STORAGE,
        encryptionKey: '',
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(state); // Simula os dados armazenados no localStorage state;
    });

    let result: any;
    // Aguarda a inicialização do estado antes de chamar `results()`
    service.initialState(state).pipe(take(1)).subscribe({});

    service
      .results((s) => {
        result = s.items;
      })
      .pipe(take(1))
      .subscribe();

    tick(); // Simula a execução assíncrona dos Observables
    expect(result).toEqual(state.items);
  }));

  it('No primeiro cenario o estado inicial vai esta vazio, mas se houver dados armazenado no localStorage, eles serao retornados', fakeAsync(() => {
    const state: AppState<any> = {
      items: [],
      callState: eLoadingState.INIT,
      storage: {
        tableName: 'table-laguage',
        storageStrategy: eStorageStrategy.LOCAL_STORAGE,
        encryptionKey: '',
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({
        items: [
          {
            language: 'portuguese',
            prefix: 'pt-BR',
          },
        ],
        callState: eLoadingState.INIT,
        storage: {
          tableName: 'table-laguage',
          storageStrategy: eStorageStrategy.LOCAL_STORAGE,
          encryptionKey: '',
        },
      });
    });

    let result: any;
    service.initialState(state).pipe(take(1)).subscribe({});

    service
      .results((s) => {
        result = s.items;
      })
      .pipe(take(1))
      .subscribe();

    tick(); // Simula a execução assíncrona dos Observables
    expect(result.length).toBe(1);
  }));
});
