// Utilities
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAdmin(): string {
    return 'Admin Module!';
  }
}
