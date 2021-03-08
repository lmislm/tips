// type First<T extends any[]> = any
type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never
// copy from https://github.com/type-challenges/type-challenges/issues/18