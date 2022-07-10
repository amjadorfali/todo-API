//FIXME add to SECRETS in deployment
export const jwtConstants = {
  secret: process.env.JWT_HASH_SECRET || '',
};
