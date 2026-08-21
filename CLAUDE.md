# CLAUDE.md --- DK's Lab Engineering Platform

## 1. Purpose

This file defines persistent engineering rules, architectural
principles, implementation workflow, and quality standards for the DK's
Lab portfolio.

Treat this document as a project-level source of truth unless a more
specific requirement explicitly overrides it.

## 2. Project Identity

DK's Lab is a **Personal Engineering Platform**, not merely a resume
website.

It combines:

-   Professional portfolio
-   Enterprise project archive
-   Technical blog
-   Troubleshooting knowledge base
-   Architecture Decision Records
-   Project-to-post relationships
-   Admin content management
-   Reader interactions

The intended impression is:

> An experienced enterprise engineer documenting architecture decisions,
> troubleshooting complex technical problems, and operating large-scale
> business systems.

Prioritize **hiring effectiveness and technical credibility over visual
novelty**.

## 3. Developer Context

Profile:

-   4-year software engineer
-   Extensive enterprise financial/banking-system experience

Primary technologies:

-   React
-   TypeScript
-   Spring Boot
-   Spring Batch
-   PostgreSQL
-   Oracle

Experience includes:

-   Banking systems
-   Enterprise web applications
-   Batch processing
-   EAI/FEP/interface integration
-   Data processing
-   Monitoring systems
-   Business administration systems

Target audience:

-   Engineering Managers
-   Senior Engineers
-   Technical Interviewers
-   Enterprise Architects
-   Recruiters

Core value proposition:

> An enterprise developer who designs, implements, and operates
> large-scale business systems with end-to-end reliability, from
> frontend state optimization to large-scale batch processing.

## 4. Engineering Principles

### 4.1 Hiring Effectiveness Over Visual Novelty

Prioritize:

1.  Information clarity
2.  Technical depth
3.  Scannability
4.  Engineering evidence
5.  Logical information hierarchy
6.  Maintainability

Do not add visual effects merely because they look impressive.

Do not sacrifice information density for decorative UI.

Preserve the existing visual identity unless the current design harms
usability or information architecture.

### 4.2 Evidence Over Marketing

Avoid generic portfolio language such as:

-   Passionate Developer
-   Problem Solver
-   Lifelong Learner
-   Fast Learner
-   Technology Enthusiast

Prefer concrete evidence:

-   What system was built
-   What problem existed
-   What the developer owned
-   What technical decision was made
-   Why the decision was made
-   What trade-offs existed
-   What measurable result was achieved

**Never fabricate metrics**, including:

-   User counts
-   Data volumes
-   Performance improvements
-   Team sizes
-   Business impact
-   Project metrics

If information is unavailable, use an explicit TODO or request
clarification.

## 5. Code Convention

### 5.1 Base Standard

Use the **Google Code Convention** as the baseline for code style,
naming, structure, readability, and maintainability.

### 5.2 Framework and Library Precedence

When official documentation or established best practices conflict with
the base convention, prefer the idiomatic and officially recommended
approach of that technology.

Priority:

1.  Official framework/library guidance
2.  Established ecosystem best practices
3.  Google Code Convention
4.  Personal preference

This applies especially to:

-   React
-   TypeScript
-   TanStack Query / React Query
-   Zustand
-   React Hook Form
-   Zod

Do not force generic conventions onto framework-specific patterns when
doing so makes the implementation less idiomatic.

## 6. React Principles

Prefer:

-   Functional components
-   Composition over inheritance
-   Feature-oriented organization
-   Explicit component responsibilities
-   Small, cohesive components
-   Custom hooks for reusable behavior
-   Clear separation of server state and client/UI state

Avoid:

-   God components
-   Excessive prop drilling
-   Business logic embedded directly in JSX
-   Unnecessary global state
-   Premature abstraction
-   Generic components created without a real reuse case

Do not abstract code merely to reduce line count.

## 7. TypeScript Principles

Use TypeScript as a type-modeling tool, not merely JavaScript with
annotations.

Prefer:

-   Strict typing
-   Inferred types where inference is reliable
-   Explicit domain types at boundaries
-   Discriminated unions where appropriate
-   Narrow types
-   Type-safe API responses
-   Reusable domain models

Avoid:

-   `any`
-   Unsafe type assertions
-   Duplicate type definitions
-   Overly broad interfaces
-   Types that merely mirror implementation details without domain
    meaning

If an unsafe assertion is genuinely necessary, document why.

## 8. State Management

Clearly separate state responsibilities.

### Server State

Use TanStack Query / React Query for:

-   Remote data
-   Fetching
-   Caching
-   Synchronization
-   Mutation state
-   Server-side loading/error states

### Client/UI State

Use Zustand or local React state for:

-   UI preferences
-   Temporary interaction state
-   Client-only application state
-   Cross-component UI state

Do not place server state into Zustand merely because it is convenient.

Do not use React Query for state that does not originate from a server.

Every global state decision should have an explicit reason.

## 9. Domain Model

Prefer domain-oriented models over UI-oriented data structures.

Conceptually:

``` text
Project
 └─ ProjectPostRelation
      └─ Post

Post
 ├─ Tags
 ├─ Comments
 ├─ Likes
 └─ Author

Comment
 └─ Child Comments

Tag
 └─ Posts

User
 ├─ Admin
 └─ Reader
```

Projects and posts must support bidirectional navigation.

A project should expose related:

-   Posts
-   Troubleshooting articles
-   Architecture decisions
-   Retrospectives

A post should expose:

-   Related project
-   Related technologies
-   Related tags

## 10. Portfolio Information Architecture

The homepage should answer these questions within approximately three
minutes:

1.  Who is this developer?
2.  What systems has this developer built?
3.  What business domains has this developer worked in?
4.  What engineering problems has this developer solved?
5.  What technical strengths does this developer have?
6.  Why should this developer receive an interview?

Prioritize these three projects:

1.  IBK Continuous Monitoring System
2.  IBK ESG HUB
3.  IBK Business Support System Reconstruction

Other projects should remain accessible but receive lower visual and
informational priority.

## 11. Project Documentation Standard

Every major project should use:

1.  **Business Problem**
    -   Domain context
    -   Existing problem
    -   User/business pain points
    -   System limitations
2.  **My Responsibilities**
    -   Personal ownership
    -   Modules developed
    -   Architecture/design responsibility
    -   Implementation scope
3.  **Technical Challenges**
    -   Concurrency
    -   Rendering bottlenecks
    -   Large datasets
    -   Data synchronization
    -   Batch processing
    -   Interface failures
    -   Permission complexity
    -   Transaction boundaries
4.  **Architecture Overview**
    -   Clear system/data flow
    -   Must satisfy the **30-second architecture rule**: an interviewer
        should understand the core architecture and technical
        responsibility within about 30 seconds.
5.  **Solutions Implemented**
    -   Concrete engineering actions
6.  **Results and Impact**
    -   Processing time
    -   Data volume
    -   Number of screens
    -   Number of batch jobs
    -   Number of interfaces
    -   Development productivity
    -   Performance improvements
7.  **Lessons Learned**
    -   Trade-offs
    -   Failed approaches
    -   Design limitations
    -   What would be changed today
    -   Engineering lessons

Never invent metrics.

## 12. Blog Platform

The blog is part of the engineering platform.

Content types:

-   Technical Articles
-   Architecture Notes
-   Troubleshooting
-   Project Retrospectives
-   Development Logs
-   Daily Engineering Notes
-   AI-assisted Engineering Reviews

Posts should support:

-   Markdown
-   Syntax highlighting
-   Table of Contents
-   Estimated reading time
-   SEO metadata
-   Open Graph metadata

## 13. Tag System

Posts must support tags such as:

-   React
-   TypeScript
-   Spring Boot
-   Spring Batch
-   PostgreSQL
-   Architecture
-   Performance
-   Troubleshooting

Required capabilities:

-   Tag detail pages
-   Related posts
-   Multi-tag filtering
-   Tag statistics
-   Tag-based navigation

## 14. Project ↔ Post Relationships

Project/post relationships are a core differentiator.

Example:

``` text
IBK Continuous Monitoring System
 ├─ Spring Batch common module design
 ├─ Large-volume data processing
 ├─ Interface failure handling
 └─ PostgreSQL optimization
```

Project pages should expose related technical articles.

Posts should clearly indicate the project from which the technical
experience originated.

Prefer contextual CTAs such as:

> This post is a deep-dive into \[Project Name\].

## 15. Troubleshooting Content

Preferred structure:

1.  Problem
2.  Symptoms
3.  Investigation
4.  Root Cause
5.  Alternatives Considered
6.  Solution
7.  Result
8.  Lessons Learned

Do not write troubleshooting posts as simple error-message explanations.

The goal is to demonstrate problem-solving ability.

## 16. Architecture Decision Records

Important technical decisions should be documentable as ADRs.

Examples:

-   Why Zustand instead of Redux?
-   Why TanStack Query for server state?
-   Why PostgreSQL?
-   Why a particular component architecture?
-   Why a particular data-fetching strategy?
-   Why a specific Supabase schema?

Each decision should explain:

``` text
Context
Decision
Alternatives
Trade-offs
Consequences
```

## 17. AI-Assisted Engineering

AI-generated code is a proposal, not authoritative code.

When AI generates an implementation:

1.  Understand the generated design
2.  Identify assumptions
3.  Review architectural implications
4.  Compare alternatives
5.  Validate correctness
6.  Validate maintainability
7.  Modify or reject when necessary

Do not blindly accept AI-generated code.

Preserve the distinction between:

> AI generated this implementation

and:

> The developer reviewed, validated, and accepted this implementation.

Potential content series:

-   AI Architecture Review
-   AI Pair Programming Notes
-   AI vs My Design
-   AI Code Review

## 18. Admin and Content Management

Only authenticated administrators can:

-   Create posts
-   Edit posts
-   Delete posts
-   Publish/unpublish posts
-   Save drafts
-   Preview posts

Readers can:

-   Read posts
-   Comment
-   Reply
-   Like/unlike

Recommended direction:

-   Supabase Auth
-   Supabase PostgreSQL
-   Row Level Security (RLS)

Never rely solely on frontend route protection for authorization.

## 19. Comments and Likes

Comments must support recursive replies.

Required operations:

-   Create
-   Read
-   Edit own comment
-   Delete own comment
-   Reply

Likes must be idempotent.

Database constraints should enforce integrity rather than relying only
on frontend checks.

## 20. Search

Search should eventually support:

-   Post title
-   Post content
-   Tags
-   Project names

Prefer database-supported search for persistent content instead of
relying exclusively on client-side filtering.

## 21. Security

Never trust the client for authorization.

Security-sensitive rules must be enforced server-side/database-side.

For Supabase:

-   Use RLS
-   Restrict administrative operations
-   Protect private user information
-   Prevent unauthorized post modification
-   Prevent duplicate reactions through constraints

Never expose secrets in frontend code.

Never place service-role credentials in client-side environment
variables.

## 22. Performance

Prioritize meaningful performance improvements.

Preferred techniques:

-   Route-level lazy loading
-   Component-level lazy loading when justified
-   TanStack Query caching
-   Pagination
-   Database indexes
-   Appropriate image optimization
-   Code splitting
-   Avoiding unnecessary global state
-   Avoiding unnecessary re-renders

Do not optimize prematurely.

Identify or measure the bottleneck before introducing complexity.

## 23. Accessibility

All new UI should consider:

-   Semantic HTML
-   Keyboard navigation
-   Focus management
-   Accessible labels
-   Color contrast
-   Reduced-motion preferences
-   Screen-reader compatibility

Do not use animation as the only means of communicating state.

## 24. SEO

Public content should be indexable where appropriate.

Consider:

-   Semantic headings
-   Metadata
-   Open Graph
-   Canonical URLs
-   Sitemap
-   RSS
-   Structured metadata where useful

Do not sacrifice application architecture solely for SEO without
explaining the trade-off.

## 25. Application Data Flow

Conceptual flow:

``` text
UI
 ↓
Feature Components
 ↓
Custom Hooks
 ↓
TanStack Query / Zustand
 ↓
Supabase Client
 ↓
PostgreSQL
```

Keep responsibilities clear.

Avoid large amounts of database/business logic inside UI components.

When complexity justifies it, prefer:

``` text
UI
 ↓
Hook
 ↓
Data/Domain Layer
 ↓
Infrastructure
```

## 26. Implementation Workflow

For substantial changes, follow:

### Phase 1 --- Analyze

Before changing code:

1.  Inspect existing architecture
2.  Identify related files
3.  Understand current data flow
4.  Identify dependencies
5.  Identify constraints
6.  Identify technical debt

Do not immediately modify files.

### Phase 2 --- Propose

Explain:

-   Current problem
-   Proposed change
-   Architectural rationale
-   Alternatives
-   Trade-offs
-   Migration impact

### Phase 3 --- Implement

Implement the smallest coherent change.

Do not mix unrelated refactoring with feature implementation unless
necessary.

### Phase 4 --- Validate

Run appropriate:

-   Type checks
-   Lint
-   Tests
-   Build
-   Relevant runtime checks

Fix regressions before continuing.

### Phase 5 --- Document

For meaningful architectural decisions, update relevant documentation.

## 27. Scope Control

When given a specific task, focus only on that task.

Do not implement unrelated roadmap items.

For example, when redesigning the homepage:

DO:

-   Analyze homepage
-   Improve homepage IA
-   Refactor required homepage components

DO NOT automatically implement:

-   Blog CMS
-   Comments
-   Likes
-   Search
-   Authentication

Those belong to separate phases.

## 28. No Placeholder Fabrication

Never fabricate business information.

If information is missing, use explicit markers such as:

``` text
TODO: Confirm actual batch count.
TODO: Confirm actual data volume.
TODO: Confirm project team size.
```

Do not invent plausible-looking numbers.

## 29. Existing Codebase Rules

Before replacing an existing component:

1.  Understand why it exists
2.  Identify consumers
3.  Identify dependencies
4.  Check whether behavior is relied upon elsewhere
5.  Determine whether replacement reduces complexity

Do not preserve legacy code solely because it already exists.

Do not rewrite the entire application without a migration reason.

## 30. Quality Gate

Before considering a feature complete, verify:

### Architecture

-   Responsibilities are clearly separated
-   The solution is consistent with the architecture
-   Complexity is justified

### Type Safety

-   Unsafe types are avoided
-   Domain boundaries are typed

### State

-   Server state is separated from client state
-   Global state is justified

### UX

-   Information is easy to scan
-   UI supports the intended user journey

### Performance

-   No unnecessary rendering/fetching
-   Queries are appropriately indexed/paginated

### Security

-   Authorization is enforced outside the client
-   Secrets are protected

### Maintainability

-   Another developer can understand the implementation
-   Abstractions are justified

### Portfolio Quality

-   Implementation demonstrates engineering judgment
-   The result communicates technical depth to interviewers

## 31. Architectural Decision Rule

When multiple technically valid solutions exist, do not silently choose
one.

For meaningful architectural decisions, state:

``` text
Decision:
Why:
Alternative:
Trade-off:
Reason for choosing:
```

Prefer the simplest architecture that satisfies current requirements
while leaving a reasonable path for future growth.

Do not introduce enterprise-level complexity merely to make the
portfolio appear sophisticated.

## 32. Final Principle

The goal is not to make the codebase look sophisticated.

The goal is to make it:

> **Understandable, maintainable, technically credible, and capable of
> demonstrating real engineering judgment.**

Every implementation decision should improve one or more of:

-   Correctness
-   Maintainability
-   Performance
-   Security
-   Accessibility
-   Developer experience
-   Hiring effectiveness
