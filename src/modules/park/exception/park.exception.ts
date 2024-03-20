import { HttpException, HttpStatus } from '@nestjs/common';

export class ParkNotFoundException extends HttpException {
  constructor() {
    super('Park not found', HttpStatus.NOT_FOUND);
  }
}
