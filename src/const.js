export const URL = process.env.REACT_APP_BASEURL
export const SUCCESS_MESSAGE = '登録が成功しました。'
export const ERROR_MESSAGE = 'エラーが発生しました。後でもう一度お試しください。'

// 各文字範囲の定義
const KANJI = '\u4e00-\u9faf'
const HIRAGANA = '\u3040-\u309f'
const KATAKANA = '\u30a0-\u30ff'
const HALFWIDTH_ENGLISH = 'a-zA-Z'
const HALFWIDTH_NUMBERS = '0-9'
const FULLWIDTH_ENGLISH = '\uff21-\uff3a\uff41-\uff5a'

// 組み合わせた正規表現
export const NAME_REGEX = new RegExp(
  `^[${KANJI}${HIRAGANA}${KATAKANA}${HALFWIDTH_ENGLISH}${HALFWIDTH_NUMBERS}${FULLWIDTH_ENGLISH}]+$`
)
