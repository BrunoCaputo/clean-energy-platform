'use client'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface ConfirmDialogProps {
  title: string
  description?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => void
  type: 'delete' | 'default'
}

export function ConfirmDialog({
  title,
  description,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
  type = 'default',
}: ConfirmDialogProps) {
  const confirmClassName: string | undefined =
    type === 'delete'
      ? 'bg-rose-500 text-white hover:bg-rose-600'
      : 'bg-emerald-500 text-white hover:bg-emerald-600'

  const confirmButton = (
    <AlertDialogAction onClick={onConfirm} className={confirmClassName}>
      {confirmButtonText}
    </AlertDialogAction>
  )

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
        {confirmButton}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
