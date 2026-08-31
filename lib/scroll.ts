export const BACK_TO_TOP_THRESHOLD = 320;

export function shouldShowBackToTop(scrollY: number) {
  return scrollY > BACK_TO_TOP_THRESHOLD;
}
