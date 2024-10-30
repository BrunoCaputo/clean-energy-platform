'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { FileType } from '@/@types/lead'
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/presentation/components/ui/dropdown-menu'

import { exportToFile } from '../actions/export-actions'

export function ExportMenu() {
  const [isExporting, setIsExporting] = useState<boolean>(false)

  async function handleFileExport(fileType: FileType) {
    try {
      setIsExporting(true)
      const blob: Blob = await exportToFile(fileType)

      const fileName = `leads.${fileType}`

      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()

      link.remove()
      URL.revokeObjectURL(url)

      toast.success(`${fileType.toUpperCase()} file exported successfully`)
    } catch (err) {
      let errorMessage = `Cannot export ${fileType.toUpperCase()} file`

      if (err instanceof Error) {
        const { error } = JSON.parse(err.message)
        errorMessage = error
      }

      toast.error(errorMessage)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenuContent>
      <DropdownMenuItem asChild onClick={() => handleFileExport('csv')}>
        <button className="w-full cursor-pointer" disabled={isExporting}>
          <span>CSV</span>
        </button>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        onClick={() => handleFileExport('xlsx')}
        disabled={isExporting}
      >
        <button className="w-full cursor-pointer">
          <span>XLSX</span>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
