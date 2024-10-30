import { Download, UserRoundPlus } from 'lucide-react'
import { Metadata } from 'next'

import { Lead } from '@/@types/lead'
import { api } from '@/core/data/api'
import { Button } from '@/presentation/components/ui/button'
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

import { ExportMenu } from './components/export-menu'
import { LeadTableRow } from './components/table-row'

export const metadata: Metadata = {
  title: 'Leads',
}

async function getLeads(): Promise<Lead[]> {
  const response = await api('/lead', {
    next: {
      revalidate: 60 * 60,
    },
  })

  const { leads } = await response.json()

  return leads
}

export default async function HomePage() {
  const leads: Lead[] = await getLeads()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 self-end">
        <Button variant="outline" className="flex items-center gap-3">
          <UserRoundPlus className="h-4 w-4" />
          Create Lead
        </Button>
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
