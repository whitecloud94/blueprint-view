import {
    BookOpen,
    Briefcase,
    CarFront,
    FileText,
    Home,
    Leaf,
    LineChart,
    ShieldCheck,
    ShoppingBag,
    Smartphone,
    User
} from 'lucide-react';
import { Project } from '../types';

export const NAV_ITEMS = [
    {Icon: Home, label: 'Home', path: '/'},
    {Icon: User, label: 'About', path: '/about'},
    {Icon: Briefcase, label: 'Projects', path: '/#projects'},
    {Icon: BookOpen, label: 'Blog', path: '/blog'},
    {Icon: ShoppingBag, label: 'Products', path: '/#products'}
];

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Toyota Financial Core',
        period: '2026.01 - Present',
        sub: "Core시스템 운영관리",
        icon: <CarFront size={20}/>,
        bg: 'bg-accent-600',
        active: true,
        achievements: [
            "여신 계정계 코어 시스템 운영 및 유지보수",
            "대량 데이터 처리 및 프로세스 최적화",
            "금융 규제 준수를 위한 시스템 로직 수정"
        ],
        tech: ["Java", "iFramwork", "Tibero", "JEUS"]
    },
    {
        id: 2,
        title: 'IBK 기업은행 업무지원 시스템 재구축',
        period: '2025.05 - 2025.12',
        sub: 'ERD 설계 및 개발 일정 관리 및 연계 데이터 적재 배치 프로그램 개발 지원',
        icon: <Briefcase size={20}/>,
        bg: 'bg-[#1A1A1A]',
        featured: true,
        achievements: [
            "화면 정의서를 바탕으로 정규화와 인덱스를 고려한 도메인 모델 및 관계형 데이터베이스 설계 수행",
            "총 4인 규모의 개발 팀 내 리더 역할 수행 중, 개발자 3인의 작업 분배 및 일정 조율을 통해 안정적인 개발 일정 관리",
            "기획자와 고객사의 요구사항을 분석하여 리스크 관리 및 설계 의도 전달",
            "React, TypeScript, Spring Boot를 활용한 프로젝트 환경에서 UI 개발과 EAI를 통한 타 시스템 연계 진행"
        ],
        tech: ["React", "TypeScript", "Java", "Spring Boot", "Spring Batch", "EDB(PostgreSQL)", "Oracle"]
    },
    {
        id: 3,
        title: 'IBK 기업은행 상시감시 시스템 구축',
        period: '2024.10 - 2025.04',
        sub: '정보계 데이터 적재 및 처리용 배치 프로그램 구조 설계',
        icon: <ShieldCheck size={20}/>,
        bg: 'bg-[#1A1A1A]',
        featured: true,
        achievements: [
            "실시간성과 안정성을 고려한 데이터 처리 로직 구현",
            "Spring Batch 기반 프로젝트 환경에서 공통 모듈을 작성하여 배치 프로그램 생산성 향상",
            "타 부서 및 외부 시스템과의 협의를 통해 필요한 데이터를 식별하고 인터페이스를 정의한 후 EAI를 통해 연계 데이터 수신 및 적재"
        ],
        tech: ["React", "TypeScript", "Java", "Spring Boot", "Spring Batch", "EDB(PostgreSQL)", "Oracle"]
    },
    {
        id: 4,
        title: 'IBK 기업은행 탄소중립 ESG HUB 시스템 구축',
        period: '2024.02 - 2024.06',
        sub: '탄소배출량 관련 데이터 수집·정제 및 시각화 시스템 구축',
        icon: <Leaf size={20}/>,
        bg: 'bg-[#1A1A1A]',
        featured: true,
        achievements: [
            "정보계 및 타 부서 시스템과 협의하여 탄소배출량 관련 인터페이스 정의 및 연계 데이터 항목 설계",
            "정보계 적재 및 가공 로직 설계, 배치 프로그램 개발 및 스케줄링 총괄",
            "ESG 관련 정량 데이터의 신뢰성과 실시간성 향상을 위한 배치 구조 최적화 및 공통 코드 적용"
        ],
        tech: ["Java", "Spring Boot", "Spring Batch", "EAI", "PostgreSQL(EDB)", "React", "TypeScript"]
    },
    {
        id: 5,
        title: 'IBK 기업은행 투자상품 통합관리 시스템 구축',
        period: '2023.04 - 2024.11',
        sub: '비예금형 투자상품 내부통제 시스템 구축',
        icon: <LineChart size={20}/>,
        bg: 'bg-[#1A1A1A]',
        achievements: [
            "결재 요청 및 승인 프로세스를 포함한 업무 처리화면 개발, Nexacro 기반의 UI 및 Java Back-end 비즈니스 로직 구현",
            "외부 시스템과의 연계를 위한 데이터 협의 및 정보계 데이터 수신, 적재 배치 프로그램 설계 및 개발",
            "일일/주간/월간 단위의 정기 배치 프로그램 설계 및 스케줄링 시스템을 활용한 배치, 로깅 자동화"
        ],
        tech: ["IBK Framework", "Java", "Nexacro", "JavaScript", "Oracle", "Tibero", "Clip Report"]
    },
    {
        id: 6,
        title: 'BNK 경남은행 시니어 뱅킹 및 모바일 뱅킹 메인화면 개편',
        period: '2023.12 - 2024.02',
        sub: '고령층 고객을 위한 시니어뱅킹 서비스 및 메인화면 고도화',
        icon: <Smartphone size={20}/>,
        bg: 'bg-[#1A1A1A]',
        achievements: [
            "시니어뱅킹(큰글씨) 서비스 UI 구현 및 접근성을 고려한 반응형 화면 구현",
            "메인화면 내 주요 메뉴 고도화 및 주요 서비스화면 개발 담당",
            "관리자 전용 페이지 및 백오피스용 API를 설계, 운영데이터 기반 관리 페이지 기능 구현"
        ],
        tech: ["IB20Framwork", "UBIZ30", "Javascript", "JSP", "Spring Framework", "Java", "Oracle"]
    },
    {
        id: 7,
        title: 'BNK 경남은행 비대면 제증명서 발급 서비스 구축',
        period: '2022.04 - 2022.09',
        sub: '공공기관 연계 비대면 제증명서 조회 및 발급 시스템 구축',
        icon: <FileText size={20}/>,
        bg: 'bg-[#1A1A1A]',
        achievements: [
            "약 40종 이상의 제증명서 레포트 레이아웃 작성 및 공통 템플릿화",
            "약 11종의 제증명서 발급 기능 화면 및 서버 비즈니스 로직 구현",
            "전행 제증명서 발급 현황 통계 및 관리자 기능 제공"
        ],
        tech: ["IB20Framework", "UBIZ30", "JavaScript", "JSP", "Spring Framework", "Oracle", "Clip Report"]
    },
];

export const RESUME_CONTENT = `
# 은행·캐피탈 금융 시스템 서버 개발자 김대경입니다.

> BNK경남은행, IBK기업은행, 토요타파이낸셜코리아에서 금융 프로젝트 7건을 수행하며 구축과 운영을 모두 경험했습니다.
> Spring Batch 기반 배치 시스템과 EAI·REST 연계 시스템을 설계해왔고, 분 단위로 실행되는 내부통제 배치의 중복실행 방지 로직 설계, 60여 건 규모의 연계 인터페이스 정의, Raw/비즈니스 테이블 분리 설계 등을 통해 데이터 정합성을 책임져 왔습니다.

---

## Work Experience

### **Toyota Financial Services Korea**
*계정계 여신 SM · CMS 프로세스 개선 | 2026.01 - Present*

- **계정계 여신 영역 운영유지보수** — 장애 대응, 요청사항 처리, 프로세스 개선
- CMS 등록/해지 프로세스 개선 기술 검토·구현 전담 — 원장 갱신 시점을 금결원 응답 확정 시점으로 변경해 미확정 데이터의 청구 대상 포함 문제 해소 (테스트 중, 운영 반영 예정)
- \`Java\`, \`iFramwork\`, \`Tibero\`, \`JEUS\`

### **IBK 기업은행 업무지원 시스템 재구축**
*연계·배치 영역 전담 | 2025.05 - 2025.12*

- **연계 인터페이스 약 60건 및 배치 Job 약 60개 설계·구현**
- Raw/비즈니스 테이블 분리 ERD 설계 및 적재-가공 파이프라인 구축
- 공통 VO 상속 구조 제안으로 팀 배치 구현 방식 표준화
- \`Spring Batch\`, \`Oracle\`, \`EAI\`, \`REST API\`

### **IBK 기업은행 상시감시 시스템 구축**
*배치 개발, 핵심 설계 스스로 결정 | 2024.10 - 2025.04*

- **배치 Job 약 200개 중 40~50개 구현, 지표ID 기준 중복실행 방지 로직 설계**
- Spring Batch JobParameters의 중복실행 방지 한계를 파악해 지표 단위 Skip 로직 설계
- 처리 시간 임계값 기반 좀비 Job 판별 로직 설계로 서버 비정상 종료 시 실행 차단 문제 해소
- \`Java\`, \`Spring Batch\`, \`Oracle\`, \`jFlow(Control-M 기반)\`

### **IBK 기업은행 탄소중립 ESG HUB 시스템 구축**
*연계·배치 단독 전담 | 2024.02 - 2024.06*

- **연계 인터페이스 약 20~30건 정의, 연계 데이터 수집·가공 배치 약 50~60개 단독 전담**
- 전행 탄소 배출량·절감량 데이터를 취합해 산식을 적용하는 배치 파이프라인 구축
- 배치 테이블 설계 원칙을 익혀 이후 프로젝트의 Raw/비즈니스 테이블 분리 설계에 적용
- \`Java\`, \`Spring Boot\`, \`Spring Batch\`, \`EAI\`, \`PostgreSQL\`

### **IBK 기업은행 투자상품 통합관리 시스템 구축**
*연계 배치(첫 배치 개발), 결재 기능·화면 개발 | 2023.04 - 2023.11*

- **공통 데이터 연계 배치 프로그램 구현 및 스케줄링** (첫 배치 개발 경험)
- 결재완료 처리 및 완료된 결재내역 조회 기능 개발
- 업무 메뉴 화면 일부 개발
- \`Java\`, \`Nexacro\`, \`Oracle\`, \`Tibero\`, \`Clip Report\`

### **BNK 경남은행 시니어 뱅킹 및 메인화면 개편**
*일정 지연 프로젝트 긴급 투입, 확정 범위 구현 | 2023.12 - 2024.01*

- **일정 지연 프로젝트에 긴급 투입** — 확정된 우선순위에 따라 메인화면 이체, 거래내역 조회, 계좌목록 조회 등 핵심 거래 기능 개발
- 압축된 일정(약 4개월) 안에서 담당 기능 개발 완료, 일정 내 오픈
- \`Java\`, \`Spring Framework\`, \`JavaScript\`, \`JSP\`, \`Oracle\`

### **BNK 경남은행 비대면 제증명서 발급 서비스 구축**
*화면·서버·쿼리 개발 | 2022.04 - 2022.09*

- **9개 도메인·100종 이상 증명서 대상 공통 템플릿 자체 설계, 클립리포트 레이아웃 약 40종 작성**
- 증명서별 조회 쿼리 및 화면·서버 로직 개발, 화면정의서 검토
- 관리자용 증명서 발급 통계 조회 기능 개발 (기간·채널·증명서별 실시간 집계)
- \`Java\`, \`Spring Framework\`, \`JavaScript\`, \`Oracle\`, \`Clip Report\`

### **하이퍼로직**
*서버 개발자 (공공 SI) | 2021.03 - 2022.03*

- Python/pandas 기반 차량주행 빅데이터 분석 플랫폼 CarInsight 개발·유지보수
- 공공 SI 프로젝트 다수 수행
- \`Python\`, \`pandas\`

---

## Skills

### **Backend**
- **Java / Spring Boot**: 대규모 금융 시스템 백엔드 개발 및 유지보수
- **Spring Batch**: 대량 데이터 처리 및 배치 작업 최적화
- **Database**: Oracle, PostgreSQL, Tibero, EDB 등 다양한 RDBMS 경험

### **Frontend**
- **React / TypeScript**: 현대적인 UI/UX 구현 및 컴포넌트 기반 개발
- **Nexacro / JavaScript**: 금융권 특화 UI 프레임워크 활용 및 웹 표준 기술 적용
- **JSP / Web Standard**: 레거시 및 최신 웹 환경 아우르는 프론트엔드 개발

---

## Certificates

- **정보처리기사** — 한국산업인력공단 (취득: 2019.08)
  - 자격번호: 19202210539L

---

## Education

- **부경대학교** - 2020.03 졸업
  - IT융합응용공학과 [3.47/4.5]

- **신정고등학교** - 2013.02 졸업

---

## Others

- **Clip Report / OZ Report / Nexacro**: 금융권 특화 솔루션 및 리포팅 툴 활용 능력
- **EAI (Enterprise Application Integration)**: 시스템 간 실시간 연계 설계 및 데이터 적재 프로세스 구축 전문가
- **Continuous Learning**: 새로운 기술 스택(React, TypeScript 등)에 대한 끊임없는 학습과 실전 적용

---

## Contact

- **Email**: [ajemfld1@gmail.com](mailto:ajemfld1@gmail.com)
- **GitHub**: [github.com/whitecloud94](https://github.com/whitecloud94)
- **Phone**: 010-9706-8608
`;
