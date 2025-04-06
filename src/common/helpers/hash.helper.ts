import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Utility class for hashing and comparing strings (e.g., passwords).
 */
@Injectable()
export class HashHelper {
  private readonly saltRounds: number = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

  /**
   * Hashes a plain text string.
   *
   * @param plainText - The plain text to hash.
   * @returns A promise that resolves to the hashed string.
   */
  public async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  /**
   * Compares a plain text string with a hashed one.
   *
   * @param plainText - The plain text string to compare.
   * @param hashedText - The hashed string to compare against.
   * @returns A promise that resolves to a boolean indicating whether the strings match.
   */
  public async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
