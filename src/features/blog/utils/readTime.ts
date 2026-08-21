/**
 * 평균 읽기 시간을 화면 문구로 바꾼다.
 *
 * <p>아직 아무도 읽지 않았으면 null 을 돌려준다. 화면은 이때 아무것도 표시하지
 * 않는다. 추정치를 지어내는 대신 모른다는 사실을 그대로 두는 편이 정직하다.
 *
 * <p>1분 미만은 "1분 미만"으로 뭉갠다. "0분" 은 읽히지 않았다는 뜻으로 오해되고,
 * 초 단위는 목록에서 필요한 정밀도가 아니다.
 */
export function formatReadTime(averageReadMs: number | null | undefined): string | null {
  if (averageReadMs === null || averageReadMs === undefined || averageReadMs <= 0) {
    return null;
  }

  const minutes = Math.round(averageReadMs / 60_000);
  return minutes < 1 ? '1분 미만' : `${minutes}분`;
}
