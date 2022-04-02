import { UserEntity } from 'src/user/entities/user.entity';

export type AuthenticatedUser = Pick<UserEntity, 'userName' | 'registrationNumber' | 'id'>;
export type JwtPayload = {
  sub: number;
  userName: string;
  id: string;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
