
import { styleTags, tags as t } from '@codemirror/highlight'

const keywords = 'Of of Then then Otherwise otherwise It it When when Wildcard wildcard'
const strings = 'String'
const logicOp = 'Not not And and Or or Minus minus'
const paren = '( )'

export default styleTags({
  Boolean: t.bool,
  Number: t.number,
  ID: t.variableName,
  [strings]: t.string,
  [keywords]: t.keyword,
  [logicOp]: t.logicOperator,
  [paren]: t.paren,
})