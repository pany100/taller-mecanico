export interface Hasher {
  verify(password: string, hash: string): Promise<boolean>;
}
