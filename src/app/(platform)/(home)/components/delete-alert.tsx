'use client'

import { toast } from 'sonner'

import { ConfirmDialog } from '@/presentation/components/confirm-dialog'

import { deleteLead } from '../actions/delete-lead'

interface DeleteAlertProps {
  leadId: string
}

export function DeleteAlert({ leadId }: DeleteAlertProps) {
  async function handleDeleteLead() {
    try {
      await deleteLead(leadId)

      toast.success(`Lead of id ${leadId} was deleted successfully`)
    } catch (err) {
      let errorMessage = 'Cannot delete lead'

      if (err instanceof Error) {
        const { error } = JSON.parse(err.message)
        errorMessage = error
      }

      toast.error(errorMessage)
    }
  }

  return (
    <ConfirmDialog
      title="Are you sure you want to delte this lead?"
      description="If you delete this lead, you will be able to access it again."
      onConfirm={handleDeleteLead}
      type="delete"
    />
  )
}
