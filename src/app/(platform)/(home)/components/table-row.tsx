import { formatDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Lead } from '@/@types/lead'
import { TableCell, TableRow } from '@/presentation/components/ui/table'
import { formatCpf, formatPhone } from '@/utils/formatters'

interface LeadTableRowProps {
  lead: Lead
}

export function LeadTableRow({ lead }: LeadTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono font-medium">{lead.id}</TableCell>
      <TableCell>{lead.name}</TableCell>
      <TableCell>{lead.email}</TableCell>
      <TableCell>{formatPhone(lead.phone)}</TableCell>
      <TableCell className="font-mono font-medium">
        {formatCpf(lead.cpf)}
      </TableCell>
      <TableCell>
        {formatDate(lead.createdAt, 'dd/MM/yyyy - HH:mm:ss', { locale: ptBR })}
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
