'use server'

import { FileType } from '@/@types/lead'
import { api } from '@/core/data/api'

export async function exportToFile(fileType: FileType): Promise<Blob> {
  const response = await api(`/lead/export?fileType=${fileType}`, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })

  if (!response.ok) {
    throw new Error(JSON.parse(await response.text()))
  }

  return response.blob()
}
