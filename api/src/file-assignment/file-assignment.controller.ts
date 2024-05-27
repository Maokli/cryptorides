// file-upload.controller.ts
import { Controller, Post, UploadedFiles, UseInterceptors, Body, UseGuards, Delete} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileAssignmentService } from './file-assignment.service';
import { join } from 'path';
import * as multer from 'multer';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class FileAssignmentController {
  constructor(private readonly fileAssignmentService: FileAssignmentService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 4, { storage }))
  async uploadFile(@UploadedFiles() files, @Body() body) {
    const fileAssignments = await Promise.all(files.map(async (file) => {
      const fileUrl = `http://localhost:3001/${file.path}`;
      console.log(fileUrl)
      const fileAssignment = await this.fileAssignmentService.create({
        fileUrl,
        elementId: body.elementId,
        elementType: body.elementType,
      });

      return { fileUrl, fileAssignment };
    }));

    return fileAssignments;
  }
  @Delete('deleteImages')
  async deleteByUrl(@Body() urls: {deletedImages : string[]}): Promise<{ success: boolean }> {
    const success = await this.fileAssignmentService.deleteByUrl(urls.deletedImages);
    return { success };
  }

}

