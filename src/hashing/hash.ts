import * as bcrypt from 'bcryptjs';

export async function hash(password: string) {
  const saltOrRounds = 10;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}
