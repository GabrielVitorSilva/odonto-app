export function formatToCurrency(text: string){
    const digitsOnly = text.replace(/\D/g, '');

    const numberValue = parseFloat(digitsOnly) / 100;

    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
}

export function parseCurrencyToNumber(formatted: string): number {
  const cleaned = formatted
    .replace(/\s/g, '')      
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')      
    .replace(',', '.');      

  const number = parseFloat(cleaned);
  return isNaN(number) ? 0 : number;
}