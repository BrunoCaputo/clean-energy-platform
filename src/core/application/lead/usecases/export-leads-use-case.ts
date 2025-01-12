import { Parser } from 'json2csv'
import * as XLSX from 'xlsx'

import { FileType } from '@/@types/lead'
import { ILeadRepository } from '@/core/data/repositories/lead-repository'
import { LeadEntityType } from '@/core/domain/entities/lead-entity'

import { fetchLeadsUseCase } from './fetch-leads-use-case'

/**
 * Convert the lead data into a CSV file
 *
 * @param {LeadEntityType[]} leads All the leads data
 * @returns The CSV file text data
 */
async function exportCsv(leads: LeadEntityType[]): Promise<string> {
  const json2csvParser = new Parser()
  const csv = json2csvParser.parse(leads)

  return csv
}

/**
 * Convert the lead data into a XLSX file
 *
 * @param {LeadEntityType[]} leads All the leads data
 * @returns The XLSX file buffer data
 */
async function exportXlsx(leads: LeadEntityType[]): Promise<Buffer> {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(leads)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

  return buffer
}

/**
 * Business rules for lead data file export
 *
 * @param {FileType} fileType Export file type (csv or xlsx)
 * @param {ILeadRepository} repository Repository instance
 * @returns The file content - String for CSV and Buffer for XLSX
 */
export async function exportLeadsUseCase(
  fileType: FileType,
  repository: ILeadRepository,
): Promise<string | Buffer> {
  try {
    const leads = (await fetchLeadsUseCase(repository)).map((lead) => {
      // Discard consumption for this operation
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { consumption, ...leadData } = lead

      return { ...leadData }
    })

    if (fileType === 'csv') {
      return await exportCsv(leads)
    } else if (fileType === 'xlsx') {
      return await exportXlsx(leads)
    } else {
      throw new Error('Invalid file type')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
