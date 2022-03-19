import {parser} from "./syntax.grammar"

import { foldNodeProp, foldInside } from '@codemirror/language'
import { styleTags, tags as t } from '@codemirror/highlight'

const keywords = 'Of of Then then Otherwise otherwise It it When when Wildcard wildcard'
const nodeKeywords = 'ChooseNode ExecutedNode ExecutionCount LastChosen'
const app = 'FactApp/Variable'
const strings = 'String NodeRef'
const compareOp = 'Eq is Ne is_not Ge ge Le le Lt lt Gt gt'
const arithmeticOp = 'Mul mul Div div Mod mod Max max Min min Plus plus Minus minus'
const logicOp = 'Not not And and Or or'
const paren = '( )'

export const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Boolean: t.bool,
      Nothing: t.null,
      Number: t.number,
      Variable: t.variableName,
      SpecialVariable: t.variableName,
      Property: t.propertyName,
      [app]: t.function(t.variableName),
      [strings]: t.string,
      [keywords]: t.keyword,
      [nodeKeywords]: t.typeName,
      [compareOp]: t.compareOperator,
      [arithmeticOp]: t.arithmeticOperator,
      [logicOp]: t.logicOperator,
      [paren]: t.paren,
    }),
    foldNodeProp.add({
      CasesExpr: foldInside
    }),
  ]
})

export const parse = (source: string) => parserWithMetadata.parse(source)