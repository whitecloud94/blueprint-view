import type { TagSummary } from '../../../schemas/postSchema';

/**
 * 기술 이름을 블로그 태그로 잇는다.
 *
 * <p>포트폴리오의 기술 스택과 블로그 태그는 서로 다른 곳에서 관리된다. 프로젝트의
 * tech 배열은 코드에 적혀 있고, 태그는 글을 쓰면서 서버에 쌓인다. 둘을 이어 두면
 * "이 기술로 무슨 글을 썼는지"를 따로 관리하지 않아도 된다.
 *
 * <p>이름을 그대로 비교하지 않는 이유는 표기가 제각각이기 때문이다.
 * "EDB(PostgreSQL)", "Spring boot - Batch" 같은 값이 실제로 들어 있다.
 */

/**
 * 백엔드 TagEntity.toSlug() 와 같은 규칙.
 *
 * <p>양쪽이 어긋나면 매칭이 조용히 실패한다. 화면에는 "관련 글 없음"으로만 보여서
 * 알아채기 어렵다. 규칙을 바꿀 일이 생기면 반드시 함께 고쳐야 한다.
 */
export const toSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * 앞 조각들이 뒤 조각들을 연속으로 품고 있는지 확인한다.
 *
 * <p>단순 문자열 포함으로 비교하면 우연히 걸린다. 조각 단위로 끊어 비교하면
 * "spring-boot-batch"가 "spring-boot"를 품는 것은 잡고, "java"가 관계없는 태그에
 * 걸리는 일은 막는다.
 */
const containsSegments = (haystack: string[], needle: string[]): boolean => {
  if (needle.length === 0 || needle.length > haystack.length) {
    return false;
  }
  return haystack.some((_, start) => needle.every((segment, offset) => haystack[start + offset] === segment));
};

/** 기술 이름 하나에 대응하는 태그. 없으면 undefined. */
export const findTagForTech = (tech: string, tags: TagSummary[]): TagSummary | undefined => {
  const slug = toSlug(tech);
  if (!slug) {
    return undefined;
  }

  const exact = tags.find((tag) => tag.slug === slug);
  if (exact) {
    return exact;
  }

  const segments = slug.split('-');

  // 여러 개가 걸리면 더 긴 쪽을 고른다. "spring-boot"와 "spring"이 모두 있다면
  // 구체적인 쪽이 사용자가 기대하는 결과다.
  return tags
    .filter((tag) => containsSegments(segments, tag.slug.split('-')))
    .sort((left, right) => right.slug.length - left.slug.length)[0];
};

/**
 * 기술 스택 전체에 대응하는 태그들.
 *
 * <p>여러 기술이 같은 태그로 이어질 수 있어 중복을 없앤다(예: Spring boot - Batch 와
 * Spring boot - MVC 는 둘 다 Spring Boot). 글이 많은 태그를 앞에 둔다.
 */
export const findTagsForTechStack = (techStack: string[], tags: TagSummary[]): TagSummary[] => {
  const matched = new Map<string, TagSummary>();

  techStack.forEach((tech) => {
    const tag = findTagForTech(tech, tags);
    if (tag) {
      matched.set(tag.slug, tag);
    }
  });

  return [...matched.values()].sort((left, right) => right.postCount - left.postCount);
};
