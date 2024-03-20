import { HttpException, HttpStatus } from '@nestjs/common';

export class FileTypeException extends HttpException {
  constructor(fileType: string) {
    super('File type expected image but ' + fileType, HttpStatus.BAD_REQUEST);
  }
}
