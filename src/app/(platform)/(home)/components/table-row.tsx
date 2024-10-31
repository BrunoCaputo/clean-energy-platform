import { formatDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'

import { Lead } from '@/@types/lead'
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/presentation/components/ui/alert-dialog'
import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogTrigger } from '@/presentation/components/ui/dialog'
import { TableCell, TableRow } from '@/presentation/components/ui/table'
import { formatCpf, formatPhone } from '@/utils/formatters'

import { ConsumptionDialog } from './consumption-dialog'
import { DeleteAlert } from './delete-alert'

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
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View
            </Button>
          </DialogTrigger>

          <ConsumptionDialog leadId={lead.id}></ConsumptionDialog>
        </Dialog>
      </TableCell>
      <TableCell className="text-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 text-rose-500" />
            </Button>
          </AlertDialogTrigger>

          <DeleteAlert leadId={lead.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
