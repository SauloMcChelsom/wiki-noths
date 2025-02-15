import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService<any>;
  const secretKey = 'test-secret-key';

  beforeEach(() => {
    service = new CryptoService<any>();
  });

  it('deve criptografar e descriptografar uma string corretamente', () => {
    const originalText = 'Hello, World!';
    const encryptedText = service.encrypt(originalText, secretKey);
    const decryptedText = service.decrypt(encryptedText, secretKey);

    expect(decryptedText).toEqual(originalText);
  });

  it('deve criptografar e descriptografar um objeto corretamente', () => {
    const originalObject = { id: 1, nome: 'Teste' };
    const encryptedText = service.encrypt(originalObject, secretKey);
    const decryptedText = service.decrypt(encryptedText, secretKey);

    expect(typeof decryptedText === 'object').toEqual(true);
    expect(decryptedText).toEqual(originalObject);
    expect(decryptedText.nome).toEqual(originalObject.nome);
  });

  it('deve lançar um erro ao tentar descriptografar com uma chave errada', () => {
    const originalText = 'Mensagem Secreta';
    const encryptedText = service.encrypt(originalText, secretKey);

    expect(() =>
      service.decrypt(encryptedText, 'chave-incorreta')
    ).toThrowError('NOTE.FAILED_DECRYPT');
  });

  it('deve descriptografar um objeto corretamente', () => {
    const encryptedText =
      'U2FsdGVkX1+eCiG66Gen2xoAhH5xd0rJz+ipZ07Q3hr3FHK5Va7OIiyFuH2Uof66wPrwhuMjjkEIWKBnv0sEejjfmFbEDoZFmzNdLzM7Oxe/nF5xdc2zSAZT06oVFyys1zUovGC1WbKqh7gCckJLECvMNdCBgL0ovcN5HTHnb7HGLB0RJOdzpRqdqUuuhGG2BQndBi3f+bP8w/MGc/gSq8qYXQB3jjpca4RiKSby1UC+Kxgik/lsq5G3yvRwDaj8YdfCdJ0vu5ceuFrx3pdzpJHYxHbMiHDwBr5SlNKc/ex0O+B+N1z825azTV3BYMpl';
    const decryptedText = service.decrypt(
      encryptedText,
      '5a203b97-53d6-406a-9909-89883e217abb'
    );

    expect(typeof decryptedText === 'object').toEqual(true);
    expect(decryptedText.items[0].prefix).toEqual('es-CO');
  });
});
