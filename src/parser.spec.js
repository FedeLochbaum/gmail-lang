import { parser } from "../dist/index.js"

const testParse = (string, expected) => {
  it(`parse [${string}] should generate: ${expected}`, () => {
    expect(parser.parse(string).toString()).toEqual(expected)
  })
}

describe('Gmail / parser', () => {

  describe('Exact match', () => {

    describe('+ operator', () => {
      testParse('+unicorn', 'Query(QueryFilter(Filter(FilterExpr(ExactMatch(FilterExpr(ID))))))')
    })
  })

  describe('keyword', () => {

    describe('from', () => {
      testParse('from:amy', 'Query(QueryFilter(Filter(Keyword(From),Expr(ID),MatchFilter(Empty))))')
    })

    describe('to', () => {
      testParse('to:david', 'Query(QueryFilter(Filter(Keyword(To),Expr(ID),MatchFilter(Empty))))')
    })

    describe('cc', () => {
      testParse('cc:david', 'Query(QueryFilter(Filter(Keyword(Cc),Expr(ID),MatchFilter(Empty))))')
    })

    describe('bcc', () => {
      testParse('bcc:david', 'Query(QueryFilter(Filter(Keyword(Bcc),Expr(ID),MatchFilter(Empty))))')
    })

    describe('label', () => {
      testParse('label:friends', 'Query(QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty))))')
    })

    describe('subject', () => {
      [
        ['subject:dinner', 'Query(QueryFilter(Filter(Keyword(Subject),Expr(ID),MatchFilter(Empty))))'],
        ['subject:(dinner OR movie)', 'Query(QueryFilter(Filter(Keyword(Subject),Expr(ExprOp(BinaryOp(OR(Expr(ID),Expr(ID))))),MatchFilter(Empty))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })
    
    describe('has', () => {
      [
        ['has:attachment', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:drive', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:document', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:spreadsheet', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:presentation', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:youtube', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:userlabels', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))'],
        ['has:nouserlabels', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchFilter(Empty))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('is', () => {
      [
        ['is:starred', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))))'],
        ['is:snoozed', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))))'],
        ['is:unread', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))))'],
        ['is:read', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))))'],
        ['is:chat movie', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Expr(ID)))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('category', () => {
      [
        ['category:primary', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))'],
        ['category:social', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))'],
        ['category:promotions', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))'],
        ['category:updates', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))'],
        ['category:forums', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))'],
        ['category:reservations', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))'],
        ['category:purchases', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchFilter(Empty))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('filename', () => {
      [
        ['filename:pdf', 'Query(QueryFilter(Filter(Keyword(Filename),Expr(ID),MatchFilter(Empty))))'],
        ['filename:homework.txt', 'Query(QueryFilter(Filter(Keyword(Filename),Expr(ID),MatchFilter(Empty))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('after', () => {
      testParse('after:2004/04/16', 'Query(QueryFilter(Filter(Keyword(After),Expr(Date),MatchFilter(Empty))))')
    })

    describe('before', () => {
      testParse('before:2004/04/16', 'Query(QueryFilter(Filter(Keyword(Before),Expr(Date),MatchFilter(Empty))))')
    })

    describe('older', () => {
      testParse('older:2004/04/16', 'Query(QueryFilter(Filter(Keyword(Older),Expr(Date),MatchFilter(Empty))))')
    })

    describe('newer', () => {
      testParse('newer:2004/04/16', 'Query(QueryFilter(Filter(Keyword(Newer),Expr(Date),MatchFilter(Empty))))')
    })

    describe('newer_than', () => {
      testParse('newer_than:2d', 'Query(QueryFilter(Filter(Keyword(NewerThan),Expr(ShortID),MatchFilter(Empty))))')
    })

    describe('older_than', () => {
      testParse('older_than:2d', 'Query(QueryFilter(Filter(Keyword(OlderThan),Expr(ShortID),MatchFilter(Empty))))')
    })

    describe('deliveredto', () => {
      testParse('deliveredto:username@gmail.com', 'Query(QueryFilter(Filter(Keyword(Deliveredto),Expr(Email),MatchFilter(Empty))))')
    })

    describe('list', () => {
      testParse('list:info@example.com', 'Query(QueryFilter(Filter(Keyword(List),Expr(Email),MatchFilter(Empty))))')
    })

    describe('in', () => {
      testParse('in:anywhere movie', 'Query(QueryFilter(Filter(Keyword(In),Expr(ID),MatchFilter(Expr(ID)))))')
    })
    
    describe('size', () => {
      testParse('size:1000000', 'Query(QueryFilter(Filter(Keyword(Size),Expr(Number),MatchFilter(Empty))))')
    })

    describe('larger', () => {
      testParse('larger:10M', 'Query(QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchFilter(Empty))))')
    })
    
    describe('smaller', () => {
      testParse('smaller:10M', 'Query(QueryFilter(Filter(Keyword(Smaller),Expr(ShortID),MatchFilter(Empty))))')
    })
  })

  describe('String', () => {
    testParse('"dinner movie tonight"', 'Query(QueryFilter(Filter(FilterExpr(String))))')
  })

  describe('Operators', () => {

    describe('AND', () => {
      testParse('is:important AND label:important', 'Query(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty)))))))')
    })

    describe('OR', () => {
      testParse('from:amy OR from:david', 'Query(QueryFilter(CompositeFilter(OR(QueryFilter(Filter(Keyword(From),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(From),Expr(ID),MatchFilter(Empty)))))))')
    })

    describe('MINUS', () => {
      [
        ['dinner - movie', 'Query(QueryFilter(CompositeFilter(MINUS(QueryFilter(Filter(FilterExpr(ID))),QueryFilter(Filter(FilterExpr(ID)))))))'],
        ['from:amy - from:david', 'Query(QueryFilter(CompositeFilter(MINUS(QueryFilter(Filter(Keyword(From),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(From),Expr(ID),MatchFilter(Empty)))))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('complex queries', () => {
      [
        // ['(is:important AND label:important)', 'Query(QueryFilter(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty))))))))'],
        // ['is:important bla', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Expr(ID)))))'],
        // ['is:important AND label:important bla', 'Query(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Expr(ID))))))))'],
        ['(is:important AND label:important) bla', ''],
        // ['(is:important AND label:important) OR larger:10M', 'Query(QueryFilter(CompositeFilter(OR(QueryFilter(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty))))))),QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchFilter(Empty)))))))'],
        // ['is:important AND (label:important OR larger:10M)', 'Query(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(QueryFilter(CompositeFilter(OR(QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchFilter(Empty)))))))))))'],
        // ['is:important AND (label:important OR larger:10M) matchLabel', '']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })
  })

})