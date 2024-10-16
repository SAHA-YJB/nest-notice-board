import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

export default ({} = {}) =>
  ConfigModule.forRoot({
    isGlobal: true,
    // 배포되는 환경마다 env를 다르게 가져와야하는 경우
    envFilePath: `.env.local`,
    load: [configuration],
  });
