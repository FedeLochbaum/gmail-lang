export const QUERY_TYPES = {
  QUERY: 'QUERY',

  FILTER_TYPES: {
    KEYWORD: 'KEYWORD',
    COMPOSITE: 'COMPOSITE'
  },

  OPERATIONS: {
    INTERSECTION: 'INTERSECTION',
    DIFFERENCE: 'DIFFERENCE',
    UNION: 'UNION',
  },

  KEYWORD_TYPES: {
    newer_than: 'NEWER_THAN',
    older_than: 'OLDER_THAN',
    category: 'CATEGORY',
    smaller: 'SMALLER',
    larger: 'LARGER',
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
    in: 'IN',
  },

  EXPR_TYPES: {
    ID: 'ID',
    DATE: 'DATE',
    SHORT_ID: 'SHORT_ID',
    STRING: 'STRING',
    EMAIL: 'EMAIL',
    NUMBER: 'NUMBER',
  },
}
