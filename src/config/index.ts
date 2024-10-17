// ConfigModule은 애플리케이션의 환경 설정을 관리하는 데 사용
import { ConfigModule } from '@nestjs/config';

// 환경 설정을 정의한 configuration 파일을 임포트
import configuration from './configuration';

// 기본 내보내기 함수로, ConfigModule을 설정
export default ({} = {}) =>
  ConfigModule.forRoot({
    // isGlobal: true 설정은 ConfigModule을 애플리케이션 전역에서 사용할 수 있게 함
    isGlobal: true,
    // envFilePath는 환경 변수를 로드할 파일 경로를 지정
    // `.env.local` 파일에서 환경 변수를 로드
    // 배포되는 환경마다 다른 .env 파일을 사용할 수 있음
    envFilePath: `.env.local`,
    // load 옵션은 추가적인 설정 파일을 로드하는 데 사용
    // 여기서는 configuration.ts 파일을 로드하여 환경 설정을 추가
    load: [configuration],
  });
