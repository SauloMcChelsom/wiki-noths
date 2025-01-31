import { DateUtil } from './date.util';

describe('DateUtil', () => {
  it('should format the date correctly', () => {
    const date = new Date(2025, 0, 31); // Janeiro é 0 no JavaScript, então 0 corresponde a janeiro.
    const formattedDate = DateUtil.getFormattedDate(date);

    // Testa se a data foi formatada corretamente
    expect(formattedDate).toBe('31/1/2025');
  });

  it('should handle single digit month and day correctly', () => {
    const date = new Date(2025, 4, 9); // 9 de maio de 2025
    const formattedDate = DateUtil.getFormattedDate(date);

    // Testa se a data com um dia e mês de um único dígito é formatada corretamente
    expect(formattedDate).toBe('9/5/2025');
  });

  it('should format the date correctly when the month is December', () => {
    const date = new Date(2025, 11, 25); // 25 de dezembro de 2025
    const formattedDate = DateUtil.getFormattedDate(date);

    // Testa a formatação de dezembro (mês 11)
    expect(formattedDate).toBe('25/12/2025');
  });

  it('should format the date correctly for a leap year', () => {
    const date = new Date(2024, 1, 29); // 29 de fevereiro de 2024 (ano bissexto)
    const formattedDate = DateUtil.getFormattedDate(date);

    // Testa a formatação para 29 de fevereiro de um ano bissexto
    expect(formattedDate).toBe('29/2/2024');
  });
});
