
import { styleTags, tags as t } from '@codemirror/highlight'

const keywords = 'Of of Then then Otherwise otherwise It it When when Wildcard wildcard'
const strings = 'String'
const arithmeticOp = 'Minus minus'
const logicOp = 'Not not And and Or or'
const paren = '( )'

export default styleTags({
  Boolean: t.bool,
  Number: t.number,
  Variable: t.variableName,
  [strings]: t.string,
  [keywords]: t.keyword,
  [arithmeticOp]: t.arithmeticOperator,
  [logicOp]: t.logicOperator,
  [paren]: t.paren,
})