import * as bcrypt from 'bcryptjs';

export async function hash(password: string) {
  const rounds = 12;
  const hash = await bcrypt.hash(password, rounds);
  return hash;
}

export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
