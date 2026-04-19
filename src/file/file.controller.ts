import {
 Controller,
 MaxFileSizeValidator,
 ParseFilePipe,
 Post,
 UploadedFile,
 UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { Multer } from 'multer';


@Controller('file')
export class FileController {
 constructor(private readonly fileService: FileService) {}


 @Public()
 @UseInterceptors(FileInterceptor('file'))
 @Post()
 async uploadFile(
   @UploadedFile(
     new ParseFilePipe({
       validators: [
         new MaxFileSizeValidator({
           maxSize: 1024 * 1024 * 10,
           message: 'Файл должен быть не более 10MB',
         }),
       ],
     }),
   )
   file: Express.Multer.File,
 ) {
   console.log(file);
   return this.fileService.uploadFile(file);
 }
}
