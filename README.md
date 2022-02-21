# regexp-replace

> base on RegExp#exec instead of String#replace.

## Usage

```ts
const case = '<view class="p-[20px] -mt-2 mb-[-20px]">test case</view>'
const regex = /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gim
// remove class
replace(case, regex, (match, arr, idx, lastIdx, str) => {
  return ''
})

// sign
function replace(str: string, pattern: RegExp, replacement: string | ((match: string, arr: RegExpExecArray, index: number, lastIndex: number, string: string) => string)): string;

// params
// match -> RegExp match string
// arr -> RegExpExecArray
// index -> RegExpExecArray#index
// lastIndex -> RegExp#lastIndex
// string -> orignal string

```

More Usages see [here](https://github.com/sonofmagic/regexp-replace/blob/main/test/index.test.ts)
