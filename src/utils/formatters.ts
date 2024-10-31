/**
 * Format the cpf number
 *
 * @param cpf CPF number
 * @returns Formatted cpf. Ex.: `000.000.000-00`
 */
export function formatCpf(cpf: string): string {
  const formattedCpf = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  )
  return formattedCpf
}

export function formatPhone(phone: string): string {
  const number = phone.trim().replace(/[^0-9]/g, '')

  if (number.length < 5) {
    return number
  }

  if (number.length < 10) {
    return number.replace(/(\d{5})(\d{4})/, '$1-$2')
  }

  if (number.length < 12) {
    return number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  return number.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')
}
