const formattedCpfCnpj = (str: string) => {
  if (str) {
    let cpfCnpj = str?.replace(/\D/g, '') // Remove todos os caracteres não numéricos

    if (cpfCnpj?.length == 11) {
      cpfCnpj = cpfCnpj.replace(/^(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os primeiros 3 dígitos
      cpfCnpj = cpfCnpj.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona um ponto após os próximos 3 dígitos
      cpfCnpj = cpfCnpj.replace(
        /^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/,
        '$1.$2.$3-$4'
      ) // Adiciona um hífen e os últimos 2 dígitos

      return cpfCnpj
    }

    // Aplica a máscara
    cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d)/, '$1.$2')
    cpfCnpj = cpfCnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    cpfCnpj = cpfCnpj.replace(/\.(\d{3})(\d)/, '.$1/$2')
    cpfCnpj = cpfCnpj.replace(/(\d{4})(\d)/, '$1-$2')

    return cpfCnpj
  }

  return ''
}

export { formattedCpfCnpj }
