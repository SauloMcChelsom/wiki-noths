import { NgModule } from '@angular/core';
import { aCrypto } from '@core/infra/crypto/abstracts/crypto.abstract';
import { CryptoService } from '@core/infra/crypto/services/crypto.service';
import { aStorage } from '@core/infra/storage/abstracts/storage.abstract';
import { StorageLocalService } from '@core/infra/storage/services/storage-local.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    {
      provide: aCrypto,
      useClass: CryptoService,
    },
    {
      provide: aStorage,
      useClass: StorageLocalService,
    },
  ],
})
export class CoreModule {}
