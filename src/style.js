
import { styleTags, tags as t } from '@codemirror/highlight'

const keywords = 'Keyword Keyword from to cc bcc subject label has list filename after before older newer older_than newer_than is in deliveredto category size larger smaller'
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