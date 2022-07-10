import { createCipheriv, randomBytes, scryptSync, createDecipheriv } from 'crypto';
const iv = randomBytes(16);

// ADD TO SECRETS
const SECRET_ENCRYPTION_KEY = randomBytes(64).toString('hex');
const salt = randomBytes(64).toString('hex');

/**
 * @description Not being used, kept for learning purposes
 */
export const encrypt = (toEncrypt: any) => {
  // The key length is dependent on the algorithm.
  // In this case for aes256, it is 32 bytes.
  // const key = (await promisify(scrypt)(SECRET_ENCRYPTION_KEY, salt, 32)) as Buffer;
  const key = scryptSync(SECRET_ENCRYPTION_KEY, salt, 32) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const toEnc = JSON.stringify(toEncrypt);
  const encryptedResult = Buffer.concat([cipher.update(toEnc), cipher.final()]);

  return encryptedResult;
};

/**
 * @description Not being used, kept for learning purposes
 */
export const decrypt = (toDecrypt: Buffer) => {
  // const key = (await promisify(scrypt)(SECRET_ENCRYPTION_KEY, salt, 32)) as Buffer;
  const key = scryptSync(SECRET_ENCRYPTION_KEY, salt, 32) as Buffer;

  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedResult = Buffer.concat([decipher.update(toDecrypt), decipher.final()]);
  return JSON.parse(decryptedResult.toString());
};
