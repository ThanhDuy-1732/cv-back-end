// Utilities
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const mongodbDatabaseModule = [
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return {
        uri: `mongodb+srv://${configService.get('MONGO_USERNAME')}:${configService.get('MONGO_PASSWORD')}@${configService.get('MONGO_URL')}/?retryWrites=true&w=majority&appName=${configService.get('MONGO_APP_NAME')}`,
        user: configService.get('MONGO_USERNAME'),
        pass: configService.get('MONGO_PASSWORD'),
        dbName: configService.get('MONGO_DB_NAME'),
        retryWrites: true,
      };
    },
  }),
];
