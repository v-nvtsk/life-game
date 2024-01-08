export default function initArray(size: number): number[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 0))
}
