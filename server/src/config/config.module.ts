import { Module, DynamicModule } from '@nestjs/common';
import * as dotenvFlow from 'dotenv-flow';

// save state
let configured = false;

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    if (!configured) {
      dotenvFlow.config();
      configured = true;
    }
    return { module: ConfigModule };
  }
}
