import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
// import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { RoleEnum } from '../enums/enum';
import { ROLES_KEY } from '../consts/const';
import { AuthGuard } from 'src/modules/shared/guards/auth.guard';
import { RolesGuard } from 'src/modules/shared/guards/role.guard';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden resource' }),
    ApiOkResponse({ description: 'success' }),
    ApiInternalServerErrorResponse({ description: 'Server Error' }),
  );
}
