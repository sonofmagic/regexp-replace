import replace from '../src'

describe('[Default]', () => {
  test('Default return self', () => {
    const testCase =
      '<view class="p-[20px] -mt-2 mb-[-20px]">p-[20px] -mt-2 mb-[-20px] margin的jit 不能这么写 -m-[20px]</view><view class="space-y-[1.6rem]"><view class="w-[300rpx] text-black text-opacity-[0.19]">w-[300rpx] text-black text-opacity-[0.19]</view><view class="min-w-[300rpx] max-h-[100px] text-[20px] leading-[0.9]">min-w-[300rpx] max-h-[100px] text-[20px] leading-[0.9]</view><view class="max-w-[300rpx] min-h-[100px] text-[#dddddd]">max-w-[300rpx] min-h-[100px] text-[#dddddd]</view><view class="flex items-center justify-center h-[100px] w-[100px] rounded-[40px] bg-[#123456] bg-opacity-[0.54] text-[#ffffff]">Hello</view><view class="border-[10px] border-[#098765] border-solid border-opacity-[0.44]">border-[10px] border-[#098765] border-solid border-opacity-[0.44]</view><view class="grid grid-cols-3 divide-x-[10px] divide-[#010101] divide-solid"><view>1</view><view>2</view><view>3</view></view></view><view class="test">test</view>'
    const regex =
      /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gim

    expect(
      replace(testCase, regex, (x, arr, idx, lastIdx, str) => {
        expect(str).toBe(testCase)
        return x
      })
    ).toBe(testCase)
  })

  test('remove class ', () => {
    const testCase =
      '<view class="p-[20px] -mt-2 mb-[-20px]">p-[20px] -mt-2 mb-[-20px] margin的jit 不能这么写 -m-[20px]</view>'
    const regex =
      /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gim
    const result = replace(testCase, regex, (x, arr, idx, lastIdx, str) => {
      expect(idx).toBe(6)
      expect(lastIdx).toBe(39)
      return ''
    })
    expect(result).toBe(
      '<view >p-[20px] -mt-2 mb-[-20px] margin的jit 不能这么写 -m-[20px]</view>'
    )
  })

  test('replace class ', () => {
    const testCase =
      '<view class="p-[20px] -mt-2 mb-[-20px]">p-[20px] -mt-2 mb-[-20px] margin的jit 不能这么写 -m-[20px]</view>'
    const regex =
      /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gim
    const result = replace(testCase, regex, (x, arr, idx, lastIdx, str) => {
      return `class="${arr[1].toUpperCase()}"`
    })
    expect(result).toBe(
      '<view class="P-[20PX] -MT-2 MB-[-20PX]">p-[20px] -mt-2 mb-[-20px] margin的jit 不能这么写 -m-[20px]</view>'
    )
  })

  test('string replacement', () => {
    const testCase = '<view class="p-[20px] -mt-2 mb-[-20px]">不能这么写</view>'
    const regex =
      /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gim
    const result = replace(testCase, regex, '[placeholder]')
    expect(result).toBe('<view [placeholder]>不能这么写</view>')
  })

  test('throw type error', () => {
    const testCase = '<view class="p-[20px] -mt-2 mb-[-20px]">不能这么写</view>'
    const regex =
      /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gim
    // @ts-ignore
    expect(() => replace(testCase, regex, 123)).toThrow(TypeError)
  })
})
