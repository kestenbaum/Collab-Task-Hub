import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Collab Task Hub! Hot reload is working! 🚀';
  }
}
