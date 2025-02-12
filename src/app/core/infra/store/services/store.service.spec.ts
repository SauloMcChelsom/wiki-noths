import { TestBed } from "@angular/core/testing";
import { StoreService } from "./store.service";
import { AppState } from "../interfaces/state.model";
import { iLanguage } from "@domain/internationalization/interfaces/language.interface";
import { eLoadingState } from "../enums/state.enum";
import { environment } from "src/assets/environments/enviroment";
import { of } from "rxjs";
import { eStorageStrategy } from "@core/infra/storage/enums/storage.enum";
import { aStorage } from "@core/infra/storage/abstracts/storage.abstract";
import { CryptoModel } from "@core/infra/crypto/abstracts/crypto.abstract";


describe("StoreService", () => {
    let service: StoreService<any>;
    let mockStorage: jasmine.SpyObj<aStorage<any>>;
    let mockSession: jasmine.SpyObj<aStorage<any>>;
    let mockCrypto: jasmine.SpyObj<CryptoModel>;

    beforeEach(() => {
        mockStorage = jasmine.createSpyObj("aStorage", ["save", "fetch", "delete"]);
        mockSession = jasmine.createSpyObj("aStorage", ["save", "fetch", "delete"]);
        mockCrypto = jasmine.createSpyObj("CryptoModel", ["encrypt", "decrypt"]);

        TestBed.configureTestingModule({
            providers: [
                StoreService,
                { provide: aStorage, useValue: mockStorage },
                { provide: aStorage, useValue: mockSession },
                { provide: CryptoModel, useValue: mockCrypto },
            ],
        });

        service = TestBed.inject(StoreService);
    });

    it("deve inicializar o estado corretamente", (done) => {
        const initialState: AppState<iLanguage> = {
            items: [],
            callState: eLoadingState.INIT,
            storage: {
                encryptionKey: environment.payloadStorage.systemLanguage.encryptionKey,
                tableName: environment.payloadStorage.systemLanguage.tableName,
                storageStrategy:
                    environment.payloadStorage.systemLanguage.storageStrategy,
            }
        }

        mockStorage.save.and.returnValue(of(void 0));

        service.initialState(initialState).subscribe(() => {
            expect(mockStorage.save).toHaveBeenCalledWith("testTable", initialState);
            done();
        });
    });

    it("deve salvar estado no localStorage quando storageStrategy for LOCAL_STORAGE", (done) => {
        const state: AppState<any> = {
            items: [{ id: 1, name: "Item 1" }],
            callState: eLoadingState.LOADED,
            storage: { tableName: "testTable", storageStrategy: eStorageStrategy.LOCAL_STORAGE },
        };

        mockStorage.save.and.returnValue(of(void 0));

        service.save(() => state).subscribe(() => {
            expect(mockStorage.save).toHaveBeenCalledWith("testTable", state);
            done();
        });
    });

    it("deve salvar estado no sessionStorage quando storageStrategy for SESSION_STORAGE", (done) => {
        const state: AppState<any> = {
            items: [{ language: 'Português (Brasil)', prefix: 'pt-BR' }],
            callState: eLoadingState.LOADED,
            storage: { tableName: "testTable", storageStrategy: eStorageStrategy.SESSION_STORAGE },
        };

        mockSession.save.and.returnValue(of(void 0));

        service.save(() => state).subscribe(() => {
            expect(mockSession.save).toHaveBeenCalledWith("testTable", state);
            done();
        });
    });

    it("deve encriptar os dados antes de salvar se encryptionKey for passado", (done) => {
        const encryptedData = "encrypted-content";
        const state: AppState<any> = {
            items: [{ language: 'Português (Brasil)', prefix: 'pt-BR' }],
            callState: eLoadingState.LOADED,
            storage: { tableName: "testTable", storageStrategy: eStorageStrategy.LOCAL_STORAGE, encryptionKey: "secret" },
        };

        mockCrypto.encrypt.and.returnValue(encryptedData);
        mockStorage.save.and.returnValue(of(void 0));

        service.save(() => state).subscribe(() => {
            expect(mockCrypto.encrypt).toHaveBeenCalledWith(state.items, "secret");
            expect(mockStorage.save).toHaveBeenCalledWith("testTable", { ...state, items: encryptedData });
            done();
        });
    });

    it("deve excluir o estado e limpar o armazenamento", (done) => {
        const state: AppState<any> = {
            items: [{ language: 'Português (Brasil)', prefix: 'pt-BR' }],
            callState: eLoadingState.LOADED,
            storage: { tableName: "testTable", storageStrategy: eStorageStrategy.LOCAL_STORAGE },
        };

        service.initialState(state);
        mockStorage.delete.and.returnValue(of(void 0));

        service.delete().subscribe(() => {
            expect(mockStorage.delete).toHaveBeenCalledWith("testTable");
            done();
        });
    });
});
