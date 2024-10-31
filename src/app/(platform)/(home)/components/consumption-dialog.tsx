import { DialogTitle } from '@radix-ui/react-dialog'
import { formatDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { api } from '@/core/data/api'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/presentation/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'

import { ConsumptionEconomyButton } from './consumption-economy-button'

interface ConsumptionDialogProps {
  leadId: string
}

async function getConsumptionsByLeadId(
  leadId: string,
): Promise<ConsumptionEntity[]> {
  const response = await api(`/consumption/${leadId}`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const { consumptions } = await response.json()

  return consumptions
}

export async function ConsumptionDialog({ leadId }: ConsumptionDialogProps) {
  const consumptions = await getConsumptionsByLeadId(leadId)

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Consumptions from: {leadId}</DialogTitle>
        <DialogDescription className="sr-only">
          Lead consumptions
        </DialogDescription>
      </DialogHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Month Cost</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Supply</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {consumptions.length > 0 ? (
            consumptions.map((consumption) => {
              return (
                <TableRow key={consumption.id}>
                  <TableCell className="font-mono font-medium">
                    {consumption.id}
                  </TableCell>
                  <TableCell>
                    {consumption.monthCost.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{consumption.city}</TableCell>
                  <TableCell>{consumption.state}</TableCell>
                  <TableCell>{consumption.supply}</TableCell>
                  <TableCell>
                    {formatDate(
                      consumption.createdAt,
                      'dd/MM/yyyy - HH:mm:ss',
                      {
                        locale: ptBR,
                      },
                    )}
                  </TableCell>
                  <TableCell>
                    <ConsumptionEconomyButton consumptionId={consumption.id} />
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-base font-medium"
              >
                No consumptions found for this lead.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DialogContent>
  )
}
