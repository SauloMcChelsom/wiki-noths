import { NgModule } from '@angular/core';
import { CryptoService } from '@core/infra/crypto/services/crypto.service';
import { StorageLocalService } from '@core/infra/storage/services/storage-local.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [StorageLocalService, CryptoService],
})
export class CoreModule {}
