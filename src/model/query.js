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
    newer_than: 'NEWER_THAN',
    older_than: 'OLDER_THAN',
    category: 'CATEGORY',
    filename: 'FILENAME',
    subject: 'SUBJECT',
    before: 'BEFORE',
    label: 'LABEL',
    after: 'AFTER',
    older: 'OLDER',
    newer: 'NEWER',
    from: 'FROM',
    bcc: 'BCC',
    has: 'HAS',
    cc: 'TO',
    is: 'IS',
    to: 'TO',
  },

  EXPR_TYPES: {
    ID: 'ID',
    DATE: 'DATE',
    SHORT_ID: 'SHORT_ID'
  },
}

export const toNext = (state, cursor) => { cursor.next(); return cursorToAST(state, cursor) }

// Factories
const Query = (filter, match) => ({ type: QUERY_TYPES.QUERY, filter, match })
const IdValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.ID, value })
const ShortIDValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.SHORT_ID, value })
const DateValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.DATE, value })
const KeywordFilter = (keyword, value) => ({ type: QUERY_TYPES.FILTER_TYPES.KEYWORD, keyword, value })
const Keyword = keyword => ({ type: QUERY_TYPES.KEYWORD_TYPES[keyword] })

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

const keywordToAST = (state, cursor) => {
  cursor.next()
  return Keyword(currentTextNode(state, cursor))
}

const idValueAST = (state, cursor) => IdValue(currentTextNode(state, cursor))
const shortIDValueAST = (state, cursor) => ShortIDValue(currentTextNode(state, cursor))
const dateValueAST = (state, cursor) => DateValue(currentTextNode(state, cursor))

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
  ShortID: shortIDValueAST,
  Date: dateValueAST,
}

export const typeOf = cursor => cursor?.name

export const cursorToAST = (state, cursor) => toAST[typeOf(cursor)](state, cursor)

export const makeQuery = (state, node) => cursorToAST(state, node.cursor())