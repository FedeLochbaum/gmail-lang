import { parser } from "../../dist/index.js"
import { currentTextNode, editoStateFrom } from "./utils.js"
import {
  Query,
  IdValue,
  EmailValue,
  StringValue,
  NumberValue,
  ShortIDValue,
  DateValue,
  KeywordFilter,
  CompositeFilter,
  Keyword,
  IntersecOp,
  DifferenceOp,
  UnionOp
} from './queryFactories'

export const sourceToQuery = source => {
  const state = editoStateFrom({ source, selection: { from: 0, to: 0 } })
  return makeQuery(state, parser.parse(source))
}

export const toNext = (state, cursor) => { cursor.next(); return cursorToAST(state, cursor) }

const filterExprToQueryAST = (state, cursor) => {
  cursor.next()
  return Query(undefined, cursor ? cursorToAST(state, cursor) : undefined)
}

const queryFilterToAST = (state, cursor) => {
  cursor.next()
  const filter = cursorToAST(state, cursor)
  const match = cursor.next() ? cursorToAST(state, cursor) : undefined
  return Query(filter, match)
}

const keywordFilterToAST = (state, cursor) => {
  cursor.next()
  const keyword = cursorToAST(state, cursor)
  cursor.next()
  const expr = cursorToAST(state, cursor)
  return KeywordFilter(keyword, expr)
}

const compositeFilterToAST = (state, cursor) => {
  cursor.next()
  const filter1 = cursorToAST(state, cursor)
  cursor.next()
  const setOp = cursorToAST(state, cursor)
  cursor.next()
  const filter2 = cursorToAST(state, cursor)
  return CompositeFilter(filter1, setOp, filter2)
}

const keywordToAST = (state, cursor) => {
  cursor.next()
  return Keyword(currentTextNode(state, cursor))
}

const wrapValue = wrapper => (state, cursor) => wrapper(currentTextNode(state, cursor))

const toAST = {
  Query: toNext,
  FilterExpr: filterExprToQueryAST,
  QueryFilter: queryFilterToAST,
  Filter: toNext,
  CompositeFilter: compositeFilterToAST,
  KeywordFilter: keywordFilterToAST,
  Keyword: keywordToAST,
  ExactMatch: toNext,
  FilterValue: toNext,
  Expr: toNext,

  MatchFilter: toNext,

  ID: wrapValue(IdValue),
  Email: wrapValue(EmailValue),
  ShortID: wrapValue(ShortIDValue),
  Date: wrapValue(DateValue),
  String: wrapValue(StringValue),
  Number: wrapValue(NumberValue),

  // Operations
  Intersection: IntersecOp,
  Difference: DifferenceOp,
  Union: UnionOp,
}

export const typeOf = cursor => cursor?.name
export const cursorToAST = (state, cursor) => {
  const _type = typeOf(cursor)  
  return _type && toAST[_type] ? toAST[_type](state, cursor) : undefined
}
export const makeQuery = (state, node) => cursorToAST(state, node.cursor())