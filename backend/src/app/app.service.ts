import { Candidate } from '@cognizant-test/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class AppService {
  processCandidate(
    name: string,
    surname: string,
    fileBuffer: Buffer
  ): Candidate {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const dataRow = data[1];

    if (!dataRow) {
      throw new BadRequestException(
        'El excel está vacío o no tiene el formato correcto.'
      );
    }
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    const row = jsonData[0];

    const seniorityInput =
      row['Seniority']?.toLowerCase() || row['seniority']?.toLowerCase();

    const rawAvailability = row['Availability'] || row['availability'];
    return {
      name,
      surname,
      seniority:
        seniorityInput === 'senior' || seniorityInput === 'junior'
          ? seniorityInput
          : 'junior',
      years: Number(row['Years of experience'] || row['years'] || row['Years']),
      availability: String(rawAvailability).toLowerCase() === 'true',
    };
  }
}
