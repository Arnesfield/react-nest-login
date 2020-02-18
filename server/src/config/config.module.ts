import { Module, DynamicModule } from '@nestjs/common';
import * as dotenvFlow from 'dotenv-flow';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    dotenvFlow.config();
    return { module: ConfigModule };
  }
}
