import { Download, UserRoundPlus } from 'lucide-react'
import { Metadata } from 'next'

import { api } from '@/core/data/api'
import { LeadEntity } from '@/core/domain/entities/lead-entity'
import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'

import { CreateLeadForm } from './components/create-lead-form'
import { ExportMenu } from './components/export-menu'
import { LeadTableRow } from './components/table-row'

export const metadata: Metadata = {
  title: 'Leads',
}

async function getLeads(): Promise<LeadEntity[]> {
  const response = await api('/lead', {
    cache: 'no-store',
  })

  const { leads } = await response.json()

  return leads
}

export default async function HomePage() {
  const leads: LeadEntity[] = await getLeads()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 self-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-3">
              <UserRoundPlus className="h-4 w-4" />
              Create Lead
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create lead</DialogTitle>
              <DialogDescription className="sr-only">
                Lead creation
              </DialogDescription>
            </DialogHeader>

            <CreateLeadForm />
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-3">
              <Download className="h-4 w-4" />
              Export leads
            </Button>
          </DropdownMenuTrigger>

          <ExportMenu />
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[164px]">Phone</TableHead>
              <TableHead className="w-[150px]">CPF</TableHead>
              <TableHead className="w-[220px]">Created at</TableHead>
              <TableHead className="w-[160px]">Consumptions</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leads &&
              leads.map((lead) => {
                return <LeadTableRow key={lead.id} lead={lead} />
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
