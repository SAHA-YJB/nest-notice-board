// 이 파일은 애플리케이션의 환경 설정을 정의
// 환경 변수는 애플리케이션의 동작을 제어하는 데 사용

// 기본 내보내기 함수로, 환경 설정 객체를 반환
export default () => ({
  // ENVIRONMENT는 현재 애플리케이션이 실행되는 환경을 나타냄
  // 예를 들어, 'development', 'production', 'local' 등의 값을 가질 수 있다
  // process.env.ENVIRONMENT는 Node.js에서 환경 변수를 가져오는 방법
  ENVIRONMENT: process.env.ENVIRONMENT,
});
