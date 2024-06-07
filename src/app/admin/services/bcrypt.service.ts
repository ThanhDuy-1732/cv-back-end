import * as Bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  genSalt(): Promise<string> {
    return Bcrypt.genSalt(10);
  }

  hash(data: string, salt: string): Promise<string> {
    return Bcrypt.hash(data, salt);
  }

  compare(data: string, hash: string): Promise<boolean> {
    return Bcrypt.compare(data, hash);
  }
}
