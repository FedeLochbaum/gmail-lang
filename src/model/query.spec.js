import { sourceToQuery } from "./query"
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

describe('Query', () => {

  describe('sourceToQuery', () => {

    const testSourceToQuery = ({ source, expectedQuery }) => {
      it(`should transform ${source} into ${JSON.stringify(expectedQuery, null, 2)}`, () => {
        expect(sourceToQuery(source)).toEqual(expectedQuery)
      })
    }

    [
      ['+unicorn', Query(undefined, IdValue('unicorn'))],
      ['"dinner movie tonight"', Query(undefined, StringValue('"dinner movie tonight"'))],
      ['from:amy', Query(KeywordFilter(Keyword('from'), IdValue('amy')))],
      ['to:david', Query(KeywordFilter(Keyword('to'), IdValue('david')))],
      ['cc:david', Query(KeywordFilter(Keyword('cc'), IdValue('david')))],
      ['bcc:david', Query(KeywordFilter(Keyword('bcc'), IdValue('david')))],
      ['label:david', Query(KeywordFilter(Keyword('label'), IdValue('david')))],
      ['subject:david', Query(KeywordFilter(Keyword('subject'), IdValue('david')))],
      ['has:attachment', Query(KeywordFilter(Keyword('has'), IdValue('attachment')))],
      ['is:starred', Query(KeywordFilter(Keyword('is'), IdValue('starred')))],
      ['category:promotions', Query(KeywordFilter(Keyword('category'), IdValue('promotions')))],
      ['filename:homework.txt', Query(KeywordFilter(Keyword('filename'), IdValue('homework.txt')))],
      ['after:2004/04/16', Query(KeywordFilter(Keyword('after'), DateValue('2004/04/16')))],
      ['before:2004/04/16', Query(KeywordFilter(Keyword('before'), DateValue('2004/04/16')))],
      ['older:2004/04/16', Query(KeywordFilter(Keyword('older'), DateValue('2004/04/16')))],
      ['newer:2004/04/16', Query(KeywordFilter(Keyword('newer'), DateValue('2004/04/16')))],
      ['newer_than:2d', Query(KeywordFilter(Keyword('newer_than'), ShortIDValue('2d')))],
      ['older_than:2d', Query(KeywordFilter(Keyword('older_than'), ShortIDValue('2d')))],
      ['deliveredto:username@gmail.com', Query(KeywordFilter(Keyword('deliveredto'), EmailValue('username@gmail.com')))],
      ['list:info@example.com', Query(KeywordFilter(Keyword('list'), EmailValue('info@example.com')))],
      ['in:anywhere movie', Query(KeywordFilter(Keyword('in'), IdValue('anywhere')), IdValue('movie'))],
      ['size:1000000', Query(KeywordFilter(Keyword('size'), NumberValue(1000000)))],
      ['larger:10M', Query(KeywordFilter(Keyword('larger'), ShortIDValue('10M')))],
      ['smaller:10M', Query(KeywordFilter(Keyword('smaller'), ShortIDValue('10M')))],
      ['is:important AND label:important', Query(CompositeFilter(KeywordFilter(Keyword('is'), IdValue('important')), IntersecOp(), KeywordFilter(Keyword('label'), IdValue('important'))))],
      ['from:amy OR from:david', Query(CompositeFilter(KeywordFilter(Keyword('from'), IdValue('amy')), UnionOp(), KeywordFilter(Keyword('from'), IdValue('david'))))],
      ['from:amy - from:david', Query(CompositeFilter(KeywordFilter(Keyword('from'), IdValue('amy')), DifferenceOp(), KeywordFilter(Keyword('from'), IdValue('david'))))],
      ['(is:important AND label:important)', Query(CompositeFilter(KeywordFilter(Keyword('is'), IdValue('important')), IntersecOp(), KeywordFilter(Keyword('label'), IdValue('important'))))],
      ['is:important AND (label:important OR larger:10M) matchLabel', Query(CompositeFilter(KeywordFilter(Keyword('is'), IdValue('important')), IntersecOp(), CompositeFilter(KeywordFilter(Keyword('label'), IdValue('important')), UnionOp(), KeywordFilter(Keyword('larger'), ShortIDValue('10M')), ShortIDValue('10M'))), IdValue('matchLabel'))],
    ].forEach(([source, expectedQuery]) => testSourceToQuery({ source, expectedQuery }))
  })
})