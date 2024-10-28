import { NextRequest } from 'next/server'

import { FileType } from '@/@types/lead'
import { exportLeadsUseCase } from '@/core/application/lead/usecases/export-leads-use-case'
import {
  ILeadRepository,
  LeadRepository,
} from '@/core/data/repositories/lead-repository'

/**
 * Lead repository that contains the database access
 */
const leadRepository: ILeadRepository = new LeadRepository()

/**
 * Export all the leads data to a csv or xlsx file
 *
 * @param {NextRequest} request Request object
 * @returns The exported file
 */
export async function GET(request: NextRequest) {
  const fileType = request.nextUrl.searchParams.get('fileType')
  let headers: HeadersInit | undefined

  try {
    if (!fileType) {
      throw new Error('Missing export file type')
    }

    if (!['csv', 'xlsx'].includes(fileType.toLowerCase())) {
      throw new Error('Invalid export file type')
    }

    const file = await exportLeadsUseCase(fileType as FileType, leadRepository)

    if (fileType === 'csv') {
      headers = {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=data.csv',
      }
    } else {
      headers = {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=data.xlsx',
      }
    }

    return new Response(file, { status: 200, headers })
  } catch (error) {
    let errorMessage = `Failed to export leads to ${fileType}`
    const status = 400
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
