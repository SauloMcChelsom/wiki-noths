import { TypeObjectUtil } from './type-object.util';

describe('setValue', function () {
  it('deve converter uma string representando um array para um array', function () {
    expect(TypeObjectUtil.setValue('[1,2,3]')).toEqual([1, 2, 3]);
  });

  it('deve converter uma string representando um objeto para um objeto', function () {
    expect(TypeObjectUtil.setValue('{"name":"Zayn"}')).toEqual({
      name: 'Zayn',
    });
  });

  it('deve converter uma string numérica para um número', function () {
    expect(TypeObjectUtil.setValue('123')).toBe(123);
  });

  it('deve converter uma string representando uma função para uma função', function () {
    const result = TypeObjectUtil.setValue('() => 42');
    expect(typeof result).toBe('function');
    expect(result()).toBe(42);
  });

  it('deve converter uma string representando uma data para um objeto Date', function () {
    const result = TypeObjectUtil.setValue('2024-02-14');
    expect(result instanceof Date).toBeTrue();
    expect(result.toISOString()).toBe(new Date('2024-02-14').toISOString());
  });

  it('deve retornar a string original se não for possível converter', function () {
    expect(TypeObjectUtil.setValue('Hello World')).toBe('Hello World');
  });

  it('deve tratar um JSON inválido e retornar como string', function () {
    expect(TypeObjectUtil.setValue('{invalid:json}')).toBe('{invalid:json}');
  });

  it('deve tratar um número decimal corretamente', function () {
    expect(TypeObjectUtil.setValue('10.5')).toBe(10.5);
  });

  it('deve tratar um booleano representado como string como string', function () {
    expect(TypeObjectUtil.setValue('true')).toBe('true');
    expect(TypeObjectUtil.setValue('false')).toBe('false');
  });
});

describe('getType', () => {
  it('deve retornar "string" para valores string', () => {
    expect(TypeObjectUtil.getType('Hello')).toBe('string');
    expect(TypeObjectUtil.getType('')).toBe('string');
  });

  it('deve retornar "number" para valores numéricos', () => {
    expect(TypeObjectUtil.getType(42)).toBe('number');
    expect(TypeObjectUtil.getType(-3.14)).toBe('number');
    expect(TypeObjectUtil.getType(0)).toBe('number');
  });

  it('deve retornar "boolean" para valores booleanos', () => {
    expect(TypeObjectUtil.getType(true)).toBe('boolean');
    expect(TypeObjectUtil.getType(false)).toBe('boolean');
  });

  it('deve retornar "object" para objetos', () => {
    expect(TypeObjectUtil.getType({})).toBe('object');
    expect(TypeObjectUtil.getType({ key: 'value' })).toBe('object');
  });

  it('deve retornar "array" para arrays', () => {
    expect(TypeObjectUtil.getType([])).toBe('array');
    expect(TypeObjectUtil.getType([1, 2, 3])).toBe('array');
  });

  it('deve retornar "date" para objetos Date', () => {
    expect(TypeObjectUtil.getType(new Date())).toBe('date');
  });

  it('deve retornar "function" para funções', () => {
    expect(TypeObjectUtil.getType(() => {})).toBe('function');
    expect(TypeObjectUtil.getType(function () {})).toBe('function');
  });

  it('deve retornar "null" para valores nulos', () => {
    expect(TypeObjectUtil.getType(null)).toBe('null');
  });

  it('deve retornar "undefined" para valores indefinidos', () => {
    expect(TypeObjectUtil.getType(undefined)).toBe('undefined');
  });
});
