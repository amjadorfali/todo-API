import { SetMetadata } from '@nestjs/common';

//Public routes, no authentication needed
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
