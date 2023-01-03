export class Transform {
  static localeDate(val:string) {
    return val.replace(/([\d]{2})([\d]{2})([\d]{2})/, '$1/$2/$3')
  }

  static money(val:string) {
    // const parser = Number(val);
    const formatter = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2})
    return formatter.format(Number(val) / 100)
    // return Number(val).toLocaleString('pt-br', {style: "currency", currency: "BRL"})
  }

  static number(val:string) {
    return String(Number(val))
  }
}