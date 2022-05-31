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
      ['"dinner movie tonight"', {
        type: QUERY_TYPES.QUERY,
        filter: undefined,
        match: { type: QUERY_TYPES.EXPR_TYPES.STRING, value: '"dinner movie tonight"' }
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
      ['has:attachment', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.has },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'attachment' }
        },
        match: undefined
      }],
      ['is:starred', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.is },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'starred' }
        },
        match: undefined
      }],
      ['category:promotions', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.category },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'promotions' }
        },
        match: undefined
      }],
      ['filename:homework.txt', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.filename },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'homework.txt' }
        },
        match: undefined
      }],
      ['after:2004/04/16', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.after },
          value: { type: QUERY_TYPES.EXPR_TYPES.DATE, value: '2004/04/16' }
        },
        match: undefined
      }],
      ['before:2004/04/16', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.before },
          value: { type: QUERY_TYPES.EXPR_TYPES.DATE, value: '2004/04/16' }
        },
        match: undefined
      }],
      ['older:2004/04/16', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.older },
          value: { type: QUERY_TYPES.EXPR_TYPES.DATE, value: '2004/04/16' }
        },
        match: undefined
      }],
      ['newer:2004/04/16', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.newer },
          value: { type: QUERY_TYPES.EXPR_TYPES.DATE, value: '2004/04/16' }
        },
        match: undefined
      }],
      ['newer_than:2d', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.newer_than },
          value: { type: QUERY_TYPES.EXPR_TYPES.SHORT_ID, value: '2d' }
        },
        match: undefined
      }],
      ['older_than:2d', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.older_than },
          value: { type: QUERY_TYPES.EXPR_TYPES.SHORT_ID, value: '2d' }
        },
        match: undefined
      }],
      ['deliveredto:username@gmail.com', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.deliveredto },
          value: { type: QUERY_TYPES.EXPR_TYPES.EMAIL, value: 'username@gmail.com' }
        },
        match: undefined
      }],
      ['list:info@example.com', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.list },
          value: { type: QUERY_TYPES.EXPR_TYPES.EMAIL, value: 'info@example.com' }
        },
        match: undefined
      }],
      ['in:anywhere movie', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.in },
          value: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'anywhere' }
        },
        match: { type: QUERY_TYPES.EXPR_TYPES.ID, value: 'movie' }
      }],
      ['size:1000000', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.size },
          value: { type: QUERY_TYPES.EXPR_TYPES.NUMBER, value: '1000000' }
        },
        match: undefined
      }],
      ['larger:10M', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.larger },
          value: { type: QUERY_TYPES.EXPR_TYPES.SHORT_ID, value: '10M' }
        },
        match: undefined
      }],
      ['smaller:10M', {
        type: QUERY_TYPES.QUERY,
        filter: {
          type: QUERY_TYPES.FILTER_TYPES.KEYWORD,
          keyword: { type: QUERY_TYPES.KEYWORD_TYPES.smaller },
          value: { type: QUERY_TYPES.EXPR_TYPES.SHORT_ID, value: '10M' }
        },
        match: undefined
      }],
    ].forEach(([source, expectedQuery]) => testSourceToQuery({ source, expectedQuery }))
  })
})