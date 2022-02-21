export default function replace (
  str: string,
  pattern: RegExp,
  replacement:
    | string
    | ((
        match: string,
        arr: RegExpExecArray,
        index: number,
        lastIndex: number,
        string: string
      ) => string)
) {
  const isString = typeof replacement === 'string'
  const isFn = typeof replacement === 'function'
  if (!isString && !isFn) {
    throw new TypeError('replacement must be a String or Fn return String')
  }
  let p = 0
  let arr: RegExpExecArray | null
  const res = []
  const fn = isString ? () => replacement : replacement
  while ((arr = pattern.exec(str)) !== null) {
    res.push(str.slice(p, arr.index))
    p = arr.index
    res.push(
      // return false like use empty string replace
      // return '0' instead of 0
      fn(str.slice(p, pattern.lastIndex), arr, p, pattern.lastIndex, str)
    )
    p = pattern.lastIndex
  }
  res.push(str.slice(p))
  return res.join('')
}
