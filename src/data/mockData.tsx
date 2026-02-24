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
import { Project, BlogPost } from "../types";

export const NAV_ITEMS = [
    {Icon: Home, label: 'Home', path: '/'},
    {Icon: User, label: 'AboutPage', path: '/about'},
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
        icon: <CarFront size={20} />,
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
        title: 'IBK 기업은행 업무지원 시스템',
        period: '2025.05 - 2025.12',
        sub: '실시간 연계(EAI) 인터페이스 설계 및 구현',
        icon: <Briefcase size={20} />,
        bg: 'bg-[#1A1A1A]',
        achievements: [
            "실시간 연계 인터페이스 약 32종 설계 및 구현",
            "관리자용 배치 모니터링 화면 및 운영관리 메뉴 구현",
            "시스템 레포트 레이아웃 약 100종 작성"
        ],
        tech: ["React", "TypeScript", "Spring", "EAI", "EDB"]
    },
    {
        id: 3,
        title: 'IBK 기업은행 상시감시 시스템',
        period: '2024.09 - 2025.05',
        sub: 'Spring Batch 기반 데이터 처리 및 공통 모듈 구현',
        icon: <ShieldCheck size={20} />,
        bg: 'bg-[#1A1A1A]',
        achievements: [
            "준실시간 데이터 및 DW 처리 프로그램 구현",
            "배치 프로그램 공통 모듈 작성",
            "스케줄링 관리 및 데이터 처리 모니터링"
        ],
        tech: ["Java", "Spring Batch", "PostgreSQL"]
    },
    {
        id: 4,
        title: 'IBK 기업은행 ESG 탄소중립 HUB',
        period: '2023.01 - 2023.04',
        sub: '실시간 연계(EAI) 로직 구현 및 관리자 화면 구현',
        icon: <Leaf size={20} />,
        bg: 'bg-[#1A1A1A]',
        tech: ["Java", "Spring", "Vue.js", "Oracle"]
    },
    {
        id: 5,
        title: 'BNK 경남은행 시니어 뱅킹 및 모바일 뱅킹 메인화면 개편',
        period: '2022.08 - 2022.12',
        sub: '메인이체, 거래내역조회 등 다수 화면 및 관리자 화면 구현',
        icon: <Smartphone size={20} />,
        bg: 'bg-[#1A1A1A]',
        tech: ["Java", "Android", "Webview", "Oracle"]
    },
    {
        id: 6,
        title: 'IBK 기업은행 투자상품 통합관리 시스템',
        period: '2022.01 - 2022.07',
        sub: '비즈니스 로직 구현 및 Spring Batch 기반의 DW 데이터 처리 로직 구현',
        icon: <LineChart size={20} />,
        bg: 'bg-[#1A1A1A]',
        tech: ["Java", "Spring Batch", "Oracle"]
    },
    {
        id: 7,
        title: 'BNK 경남은행 비대면 제증명서 발급 서비스',
        period: '2021.09 - 2021.12',
        sub: '레포트 레이아웃 작성 및 비즈니스 로직 구현',
        icon: <FileText size={20} />,
        bg: 'bg-[#1A1A1A]',
        tech: ["Java", "OZ Report", "Oracle"]
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
# 👋 안녕하세요, 김대경입니다.

> **기술은 비즈니스 문제를 해결하기 위한 도구입니다. 복잡한 요구사항을 단순하고 효율적인 로직으로 구현해내는 프로세스 그 자체에 가치를 두고 작업에 임합니다.**

---

## 💼 Work Experience

### 🚗 **Toyota Financial Services Korea**
*Core 시스템 운영관리 | 2025.01 - Present*

-  **여신 계정계 코어 시스템 운영 및 유지보수**
-  대량 데이터 처리 및 프로세스 최적화
-  금융 규제 준수를 위한 시스템 로직 수정
-  \`Java\`, \`iFramwork\`, \`Tibero\`, \`JEUS\`

### 🏦 **IBK 기업은행 업무지원 시스템**
*실시간 연계(EAI) 인터페이스 설계 및 구현 | 2025.05 - 2025.12*

-  **실시간 연계 인터페이스 약 32종 설계 및 구현**
- ️ 관리자용 배치 모니터링 화면 및 운영관리 메뉴 구현
-  시스템 레포트 레이아웃 약 100종 작성
-  \`React\`, \`TypeScript\`, \`Spring\`, \`EAI\`, \`EDB\`

### 🛡️ **IBK 기업은행 상시감시 시스템**
*Spring Batch 기반 데이터 처리 및 공통 모듈 구현 | 2024.09 - 2025.05*

- **준실시간 데이터 및 DW 처리 프로그램 구현**
- 배치 프로그램 공통 모듈 작성
- ️ 스케줄링 관리 및 데이터 처리 모니터링
-  \`Java\`, \`Spring Batch\`, \`PostgreSQL\`

### 🌿 **IBK 기업은행 ESG 탄소중립 HUB**
*실시간 연계(EAI) 로직 및 관리자 화면 구현 | 2023.01 - 2023.04*

-  EAI 연계 로직 설계 및 구현
-  관리자 대시보드 및 운영 메뉴 개발
-  \`Java\`, \`Spring\`, \`Vue.js\`, \`Oracle\`

---

## 🛠️ Skills

###  **Backend**
- **Java / Spring Boot**: 대규모 금융 시스템 백엔드 개발 및 유지보수
- **Spring Batch**: 대량 데이터 처리 및 배치 작업 최적화
- **Database**: Oracle, PostgreSQL, Tibero, EDB 등 다양한 RDBMS 경험

###  **Frontend**
- **React / TypeScript**: 현대적인 UI/UX 구현 및 컴포넌트 기반 개발
- **Vue.js**: 관리자 화면 및 인터랙티브 웹 개발

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

- **OZ Report / iFramwork**: 금융권 특화 솔루션 활용 능력
- **EAI (Enterprise Application Integration)**: 시스템 간 실시간 연계 설계 전문가
- **Continuous Learning**: 새로운 기술 스택(React, TypeScript 등)에 대한 끊임없는 학습과 적용

---

## ✉️ Contact

- **Email**: [ajemfld1@gmail.com](mailto:ajemfld1@gmail.com)
- **GitHub**: [github.com/whitecloud94](https://github.com/whitecloud94)
- **Phone**: 010-9706-8608
`;
