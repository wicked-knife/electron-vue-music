export const randomNumber = (l: number, r: number): number => {
  return Math.floor(l + Math.random() * (r - l) + 1)
}
