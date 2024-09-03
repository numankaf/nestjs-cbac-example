import { SetMetadata } from '@nestjs/common';
import { IS_NO_AUTH_ENDPOINT } from '../constants/constants';

export const SkipAuth = () => SetMetadata(IS_NO_AUTH_ENDPOINT, true);
