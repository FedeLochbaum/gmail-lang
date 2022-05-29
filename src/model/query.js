import { parser } from "../../dist/index.js"
import { currentTextNode, editoStateFrom } from "./utils.js"

export const sourceToQuery = source => {
  const state = editoStateFrom({ source, selection: { from: 0, to: 0 } })
  return makeQuery(state, parser.parse(source))
}

export const QUERY_TYPES = {
  QUERY: 'QUERY',

  FILTER_TYPES: {
    KEYWORD: 'KEYWORD'
  },

  KEYWORD_TYPES: {
    from: 'FROM',
    cc: 'TO',
    bcc: 'BCC',
    to: 'TO',
    label: 'LABEL',
    subject: 'SUBJECT'
  },

  EXPR_TYPES: {
    ID: 'ID'
  },
}

export const toNext = (state, cursor) => { cursor.next(); return cursorToAST(state, cursor) }

// Factories
const Query = (filter, match) => ({ type: QUERY_TYPES.QUERY, filter, match })
const IdValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.ID, value })
const KeywordFilter = (keyword, value) => ({ type: QUERY_TYPES.FILTER_TYPES.KEYWORD, keyword, value })
const Keyword = keyword => ({ type: QUERY_TYPES.KEYWORD_TYPES[keyword] })

const filterExprToQueryAST = (state, cursor) => {
  cursor.next()
  return Query(undefined, cursor ? cursorToAST(state, cursor) : undefined)
}

const idValueAST = (state, cursor) => IdValue(currentTextNode(state, cursor))

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

const keywordToAST = (state, cursor) => {
  cursor.next()
  return Keyword(currentTextNode(state, cursor))
}

const toAST = {
  Query: toNext,
  FilterExpr: filterExprToQueryAST,
  QueryFilter: queryFilterToAST,
  Filter: toNext,
  KeywordFilter: keywordFilterToAST,
  Keyword: keywordToAST,
  ExactMatch: toNext,
  FilterValue: toNext,
  Expr: toNext,
  ID: idValueAST,
}

export const typeOf = cursor => cursor?.name

export const cursorToAST = (state, cursor) => toAST[typeOf(cursor)](state, cursor)

export const makeQuery = (state, node) => cursorToAST(state, node.cursor())