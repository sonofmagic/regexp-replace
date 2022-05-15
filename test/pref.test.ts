import replace from '@/index'
import fs from 'fs'
import path from 'path'
export const classRegexp =
  /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gims

export const tagRegexp =
  /<([a-z][-a-z]*[a-z]*)\s*(([a-z][-a-z]*[a-z]*)(?:\s*=\s*"(.*?)")?)*\s*\/?\s*>/gims

// /[\r\n\s]*<(?:\/)?([^ =>]+)([^>]*?)(?:\/)?>/gim

// export const noClosedTagRegexp = /[\r\n\s]*<([^ =>]+)([^>]*?)(?:\/)?>/gim

export function classStringReplace (
  str: string,
  replacement: (
    string: string,
    arr: RegExpExecArray,
    index?: number,
    lastIndex?: number
  ) => string
) {
  return replace(str, classRegexp, replacement)
}

export function tagStringReplace (
  str: string,
  replacement: (
    string: string,
    arr: RegExpExecArray,
    index?: number,
    lastIndex?: number
  ) => string
) {
  return replace(str, tagRegexp, replacement)
}

export const doubleQuoteRegexp = /"([^"]*)"/gms

export function doubleQuoteStringReplace (
  str: string,
  replacement: (
    string: string,
    arr: RegExpExecArray,
    index?: number,
    lastIndex?: number
  ) => string
) {
  return replace(str, doubleQuoteRegexp, replacement)
}

export const variableRegExp = /{{(.*?)}}/gms

export function variableMatch (original: string) {
  return variableRegExp.exec(original)
}

const getCase = (filename: string) => {
  return fs.readFileSync(path.resolve(__dirname, 'fixtures', filename), 'utf-8')
}
function log (message: any, ...args: any[]) {
  console.log(message, ...args)
}
function now () {
  return Date.now()
}

export function templeteHandler (rawSource: string) {
  console.time('templeteHandler')
  const res = tagStringReplace(rawSource, (x) => {
    console.time('tagStringReplace')
    const res = classStringReplace(x, (y) => {
      console.time('classStringReplace')
      const res1 = doubleQuoteStringReplace(y, (z, arr) => {
        const res2 = `"${arr[1]}"`
        return res2
      })
      console.timeEnd('classStringReplace')
      return res1
    })
    console.timeEnd('tagStringReplace')
    return res
  })
  console.timeEnd('templeteHandler')
  return res
}

describe('performance', () => {
  beforeEach(() => {
    process.env.DEBUG = '*'
  })
  test('long time', async () => {
    const source = await getCase('pref.wxml')
    console.time('long time bug')

    const str = templeteHandler(source)

    console.timeEnd('long time bug')
    // expect(ts < 100).toBe(true)
    expect(str).toBe(str)
  })
})
