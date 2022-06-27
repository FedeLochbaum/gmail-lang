import { QUERY_TYPES } from './types'
import { sourceToQuery } from './query'

export const evalQueryNode = ({ filter, match = {} }, dataSource) => {
  const filteredEmails = evalQuery(filter, dataSource)
  return dataSource.filterByMatch(filteredEmails, match?.value)
}

export const evalKeywordFilterNode = ({ keyword, value = {} }, dataSource) => {
  return dataSource.allByKeyword(keyword, value?.value)
}

export const evalCompositeFilterNode = ({ filter1, op = {}, filter2 }, dataSource) => {
  const filteredEmails = evalQuery(filter1, dataSource)
  const filteredEmails2 = evalQuery(filter2, dataSource)
  switch (op.type) {
    case QUERY_TYPES.OPERATIONS.INTERSECTION:
      return dataSource.intersection(filteredEmails, filteredEmails2)
    case QUERY_TYPES.OPERATIONS.DIFFERENCE:
      return dataSource.difference(filteredEmails, filteredEmails2)
    case QUERY_TYPES.OPERATIONS.UNION:
      return dataSource.union(filteredEmails, filteredEmails2)
    default:
      throw new Error(`Unknown operation: ${op?.value}`)
  }
}

export const EVAL_QUERY = {
  // Query
  [QUERY_TYPES.QUERY]: evalQueryNode,

  // Filters
  [QUERY_TYPES.FILTER_TYPES.KEYWORD]: evalKeywordFilterNode,
  [QUERY_TYPES.FILTER_TYPES.COMPOSITE]: evalCompositeFilterNode,
}

export const evalQuery = (query, dataSource) =>
  query && EVAL_QUERY[query?.type] ? EVAL_QUERY[query?.type](query, dataSource) : undefined

export const evalLangQuery = (source, dataSource) => evalQuery(sourceToQuery(source), dataSource)