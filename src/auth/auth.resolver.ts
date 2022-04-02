import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthService } from './auth.service';
import { LoginInputDTO, LoginResponseDTO } from './dtos';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserDocument } from 'src/user/user.schema';
import { AuthenticatedUser } from './auth.interfaces';
import { Public } from './decorators/public-routes.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponseDTO, { name: 'signIn' })
  async login(@Args('user') user: LoginInputDTO) {
    const res = await this.authService.login(user);
    return res;
  }

  @Query(() => UserEntity, { name: 'getCurrentAuthenticatedUser' })
  async currUser(@CurrentUser() user: AuthenticatedUser): Promise<UserDocument | null> {
    return await this.authService.currentUser(user);
  }
}
