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
import {Project, BlogPost} from "../types";

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
        bg: 'bg-indigo-600',
        active: true,
        achievements: [
            "여신 계정계 코어 시스템 운영 및 유지보수",
            "대량 데이터 처리 및 프로세스 최적화",
            "금융 규제 준수를 위한 시스템 로직 수정"
        ],
        tech: ["Java", "iFramwork", "Tibero", "JEUS"],
        blogId: 1
    },
    {
        id: 2,
        title: 'IBK 기업은행 업무지원 시스템 재구축',
        period: '2025.05 - 2025.12',
        sub: 'ERD 설계 및 개발 일정 관리 및 연계 데이터 적재 배치 프로그램 개발 지원',
        icon: <Briefcase size={20}/>,
        bg: 'bg-[#1A1A1A]',
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

export const MOCK_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Building a Liquid Glass UI with React & Tailwind",
        excerpt: "현대적인 웹 디자인 트렌드인 리퀴드 글래스(Liquid Glass) 효과를 Tailwind CSS와 Framer Motion을 사용하여 구현하는 방법을 상세하게 알아봅니다.",
        content: `
# Building a Liquid Glass UI with React & Tailwind

현대적인 웹 디자인 트렌드인 **리퀴드 글래스(Liquid Glass)** 효과를 Tailwind CSS와 Framer Motion을 사용하여 구현하는 방법을 상세하게 알아봅니다.

## 리퀴드 글래스란?
리퀴드 글래스는 기존의 글래스모피즘(Glassmorphism)에서 한 단계 더 나아가, 유동적이고 부드러운 애니메이션과 더 깊이 있는 블러 효과를 결합한 디자인 스타일입니다.

### 주요 특징
- **Backdrop Blur**: 배경을 흐릿하게 처리하여 전경의 가독성을 높입니다.
- **Subtle Gradients**: 부드러운 그라데이션을 사용하여 입체감을 부여합니다.
- **Glass Reflections**: 빛의 반사를 표현하는 미세한 테두리와 하이라이트를 추가합니다.

\`\`\`tsx
const GlassCard = ({ children }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
      {children}
    </div>
  );
};
\`\`\`

## 구현 방법
Tailwind CSS의 \`backdrop-blur\` 유틸리티 클래스를 사용하면 손쉽게 기본 효과를 낼 수 있습니다.

1. **배경 설정**: 어두운 배경이나 패턴이 있는 배경이 효과적입니다.
2. **반투명 레이어**: \`bg-white/10\`과 같은 반투명 배경색을 적용합니다.
3. **블러 효과**: \`backdrop-blur-md\` 또는 \`backdrop-blur-xl\`을 사용합니다.
4. **테두리 디테일**: \`border border-white/20\`으로 유리 조각의 끝부분을 표현합니다.
        `,
        date: "2026.01.26",
        readTime: "5 min read",
        tags: ["React", "Design System", "Tailwind"],
        relatedProjectId: 1
    },
    {
        id: 2,
        title: "Spring Boot Transaction Management",
        excerpt: "금융권 프로젝트에서 경험한 트랜잭션 격리 수준과 전파 속성에 대한 심층 분석. 데이터 정합성을 지키기 위한 고군분투기.",
        content: `
# Spring Boot Transaction Management

금융권 프로젝트에서 경험한 트랜잭션 격리 수준과 전파 속성에 대한 심층 분석. 데이터 정합성을 지키기 위한 고군분투기.

## 트랜잭션의 ACID 원칙
금융 시스템에서 데이터 정합성은 무엇보다 중요합니다.

- **Atomicity (원자성)**: 트랜잭션 내의 모든 작업은 완벽히 수행되거나 전혀 수행되지 않아야 합니다.
- **Consistency (일관성)**: 트랜잭션 완료 후 시스템은 일관된 상태를 유지해야 합니다.
- **Isolation (격리성)**: 동시에 실행되는 트랜잭션들이 서로 영향을 주지 않아야 합니다.
- **Durability (지속성)**: 성공한 트랜잭션 결과는 영구적으로 반영되어야 합니다.

## @Transactional 설정
Spring Boot에서는 어노테이션 기반으로 간편하게 트랜잭션을 관리할 수 있습니다.

\`\`\`java
@Service
public class TransferService {
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
    public void transferMoney(Long from, Long to, BigDecimal amount) {
        // 이체 로직
    }
}
\`\`\`

### 격리 수준 (Isolation Level)
금융 시스템에서는 보통 \`READ_COMMITTED\`를 기본으로 사용하며, 특정 통계나 마감 작업 시 \`SERIALIZABLE\`을 고려하기도 합니다.
        `,
        date: "2026.01.20",
        readTime: "12 min read",
        tags: ["Spring Boot", "Database", "Backend"]
    }
];

export const RESUME_CONTENT = `
# 🛠️ 비즈니스의 가치를 더하는 풀스택 개발자, 김대경입니다.

> **기술은 비즈니스 문제를 해결하기 위한 도구라는 신념 아래, 복잡한 요구사항을 안정적이고 확장 가능한 아키텍처로 구현하는 데 주력합니다.** 
> 금융권 프로젝트를 수행하며 데이터 정합성과 시스템 안정성을 최우선으로 생각하는 태도를 길렀으며, 다양한 스테이크홀더와의 협업을 통해 프로젝트의 성공을 이끌어내는 경험을 쌓아왔습니다.

---

## 💼 Work Experience

### 🚗 **Toyota Financial Services Korea**
*Core 시스템 운영관리 | 2026.01 - Present*

- **여신 계정계 코어 시스템 운영 및 유지보수**
- 대량 데이터 처리 및 프로세스 최적화
- 금융 규제 준수를 위한 시스템 로직 수정
- \`Java\`, \`iFramwork\`, \`Tibero\`, \`JEUS\`

### 🏦 **IBK 기업은행 업무지원 시스템 재구축**
*ERD 설계 및 데이터 연계 배치 개발 | 2025.05 - 2025.12*

- **도메인 모델 및 관계형 데이터베이스 설계 (정규화, 인덱스 최적화)**
- 개발 팀 리더로서 일정 조율 및 리스크 관리
- React, TypeScript UI 개발 및 EAI 시스템 연계
- \`React\`, \`TypeScript\`, \`Spring Boot\`, \`Spring Batch\`, \`EDB\`, \`Oracle\`

### 🛡️ **IBK 기업은행 상시감시 시스템 구축**
*정보계 데이터 적재 및 처리 구조 설계 | 2024.10 - 2025.04*

- **Spring Batch 기반 공통 모듈 작성을 통한 생산성 향상**
- 실시간성과 안정성을 고려한 데이터 처리 로직 구현
- 외부 시스템 협의 및 EAI 인터페이스 정의
- \`Java\`, \`Spring Boot\`, \`Spring Batch\`, \`EDB\`, \`Oracle\`

### 🌿 **IBK 기업은행 탄소중립 ESG HUB 시스템 구축**
*ESG 통합 관리 시스템 및 배치 프로세스 구축 | 2024.02 - 2024.06*

- **탄소배출량 데이터 수집·정제 및 시각화 시스템 구축**
- 정보계 연계 데이터 항목 설계 및 배치 스케줄링 총괄
- 배치 구조 최적화 및 공통 코드 적용으로 데이터 신뢰성 확보
- \`Java\`, \`Spring Boot\`, \`Spring Batch\`, \`EAI\`, \`PostgreSQL\`, \`React\`

### 📈 **IBK 기업은행 투자상품 통합관리 시스템 구축**
*내부통제 시스템 및 데이터 연계 개발 | 2023.04 - 2024.11*

- **비예금형 투자상품 모니터링 및 결재 프로세스 구현**
- Nexacro 기반 UI 및 Java 백엔드 비즈니스 로직 개발
- 정기 배치 프로그램 설계 및 스케줄링 자동화
- \`Java\`, \`Nexacro\`, \`Oracle\`, \`Tibero\`, \`Clip Report\`

### 📱 **BNK 경남은행 시니어 뱅킹 및 메인화면 개편**
*접근성 강화 및 메인 서비스 고도화 | 2023.12 - 2024.02*

- **고령층 고객을 위한 시니어뱅킹(큰글씨) UI 및 반응형 화면 구현**
- 메인이체, 거래내역조회 등 주요 뱅킹 서비스 개발
- 관리자 페이지 및 백오피스용 API 설계
- \`Java\`, \`Spring Framework\`, \`JavaScript\`, \`JSP\`, \`Oracle\`

### 📄 **BNK 경남은행 비대면 제증명서 발급 서비스 구축**
*레포트 레이아웃 및 발급 시스템 구축 | 2022.04 - 2022.09*

- **40종 이상의 제증명서 레포트 공통 템플릿화**
- 비대면 채널 증명서 조회 및 단말기 발급 UI/로직 구현
- 발급 현황 통계 및 관리 기능을 위한 백데이터 처리
- \`Java\`, \`Spring Framework\`, \`JavaScript\`, \`Oracle\`, \`Clip Report\`

---

## 🛠️ Skills

###  **Backend**
- **Java / Spring Boot**: 대규모 금융 시스템 백엔드 개발 및 유지보수
- **Spring Batch**: 대량 데이터 처리 및 배치 작업 최적화
- **Database**: Oracle, PostgreSQL, Tibero, EDB 등 다양한 RDBMS 경험

###  **Frontend**
- **React / TypeScript**: 현대적인 UI/UX 구현 및 컴포넌트 기반 개발
- **Nexacro / JavaScript**: 금융권 특화 UI 프레임워크 활용 및 웹 표준 기술 적용
- **JSP / Web Standard**: 레거시 및 최신 웹 환경 아우르는 프론트엔드 개발

---

## 🏆 Certificates

- **정보처리기사** — 한국산업인력공단 (취득: 2019.08)
  - 자격번호: 19202210539L

---

## 🏫 Education

- **부경대학교** - 2020.03 졸업
  - IT융합응용공학과 [3.47/4.5]

- **신정고등학교** - 2013.02 졸업

---

## 🎓 Others

- **Clip Report / OZ Report / Nexacro**: 금융권 특화 솔루션 및 리포팅 툴 활용 능력
- **EAI (Enterprise Application Integration)**: 시스템 간 실시간 연계 설계 및 데이터 적재 프로세스 구축 전문가
- **Continuous Learning**: 새로운 기술 스택(React, TypeScript 등)에 대한 끊임없는 학습과 실전 적용

---

## ✉️ Contact

- **Email**: [ajemfld1@gmail.com](mailto:ajemfld1@gmail.com)
- **GitHub**: [github.com/whitecloud94](https://github.com/whitecloud94)
- **Phone**: 010-9706-8608
`;
