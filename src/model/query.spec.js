import { QUERY_TYPES, sourceToQuery } from "./query"

describe('Query', () => {

  describe('sourceToQuery', () => {

    const testSourceToQuery = ({ source, expectedQuery }) => {
      it(`should transform ${source} into ${JSON.stringify(expectedQuery, null, 2)}`, () => {
        expect(sourceToQuery(source)).toEqual(expectedQuery)
      })
    }

    [
      ['+unicorn', {
        type: QUERY_TYPES.QUERY,
        filter: undefined,
        match: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'unicorn' }
      }],
      ['from:amy', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.from },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'amy' }
        },
        match: undefined
      }],
      ['to:david', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.to },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'david' }
        },
        match: undefined
      }],
      ['cc:david', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.cc },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'david' }
        },
        match: undefined
      }],
      ['bcc:david', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.bcc },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'david' }
        },
        match: undefined
      }],
      ['label:david', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.label },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'david' }
        },
        match: undefined
      }],
      ['subject:david', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.subject },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'david' }
        },
        match: undefined
      }],
      // TODO: HAS
    ].forEach(([source, expectedQuery]) => testSourceToQuery({ source, expectedQuery }))
  })
})