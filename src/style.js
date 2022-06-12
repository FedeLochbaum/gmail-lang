
import { styleTags, tags as t } from '@codemirror/highlight'

const keywords = 'Keyword Keyword'
const strings = 'String'
const IDS = 'ID ShortID Email'
const logicOp = 'Not not And and Or or Minus minus'
const paren = '( )'

export default styleTags({
  Boolean: t.bool,
  Number: t.number,
  [IDS]: t.variableName,
  [strings]: t.string,
  [keywords]: t.keyword,
  [logicOp]: t.logicOperator,
  [paren]: t.paren,
})