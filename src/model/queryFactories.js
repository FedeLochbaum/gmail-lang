import { QUERY_TYPES } from './types'

// Factories
export const Query = (filter, match) => ({ type: QUERY_TYPES.QUERY, filter, match })
export const IdValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.ID, value })
export const EmailValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.EMAIL, value })
export const StringValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.STRING, value })
export const NumberValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.NUMBER, value: parseInt(value) })
export const ShortIDValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.SHORT_ID, value })
export const DateValue = value => ({ type: QUERY_TYPES.EXPR_TYPES.DATE, value })
export const KeywordFilter = (keyword, value) => ({ type: QUERY_TYPES.FILTER_TYPES.KEYWORD, keyword, value })
export const CompositeFilter = (filter1, op, filter2) => ({ type: QUERY_TYPES.FILTER_TYPES.COMPOSITE, op, filter1, filter2 })
export const Keyword = keyword => ({ type: QUERY_TYPES.KEYWORD_TYPES[keyword] })
export const IntersecOp = () => ({ type: QUERY_TYPES.OPERATIONS.INTERSECTION })
export const DifferenceOp = () => ({ type: QUERY_TYPES.OPERATIONS.DIFFERENCE })
export const UnionOp = () => ({ type: QUERY_TYPES.OPERATIONS.UNION })