import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_NO_AUTH_ENDPOINT } from '../constants/constants';

export const guardSkipper = (
  context: ExecutionContext,
  reflector: Reflector,
) => {
  return reflector.getAllAndOverride(IS_NO_AUTH_ENDPOINT, [
    context.getHandler(),
    context.getClass(),
  ]);
};
