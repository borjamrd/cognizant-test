import { Candidate } from '@cognizant-test/interfaces';
import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('candidate')
  @UseInterceptors(FileInterceptor('file'))
  uploadCandidate(
    @Body() body: { name: string; surname: string },
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      })
    )
    file: Express.Multer.File
  ): Candidate {
    return this.appService.processCandidate(
      body.name,
      body.surname,
      file.buffer
    );
  }
}
