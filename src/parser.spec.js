import { parser } from "../dist/index.js"

const testParse = (string, expected) => {
  it(`parse [${string}] should generate: ${expected}`, () => {
    expect(parser.parse(string).toString()).toEqual(expected)
  })
}

describe('Gmail / parser', () => {

  describe('Exact match', () => {

    describe('+ operator', () => {
      testParse('+unicorn', 'Query(FilterExpr(ExactMatch(FilterValue(ID))))')
    })
  })

  describe('keyword', () => {

    describe('from', () => {
      testParse('from:amy', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(From),Expr(ID)))))')
    })

    describe('to', () => {
      testParse('to:david', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(To),Expr(ID)))))')
    })

    describe('cc', () => {
      testParse('cc:david', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Cc),Expr(ID)))))')
    })

    describe('bcc', () => {
      testParse('bcc:david', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Bcc),Expr(ID)))))')
    })

    describe('label', () => {
      testParse('label:friends', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Label),Expr(ID)))))')
    })

    describe('subject', () => {
      [
        ['subject:dinner', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Subject),Expr(ID)))))'],
        // ['subject:(dinner OR movie)', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Subject),Expr(ExprOp(BinaryOp(OR(Expr(ID),Expr(ID)))))))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })
    
    describe('has', () => {
      [
        ['has:attachment', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:drive', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:document', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:spreadsheet', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:presentation', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:youtube', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:userlabels', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))'],
        ['has:nouserlabels', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Has),Expr(ID)))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('is', () => {
      [
        ['is:starred', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID)))))'],
        ['is:snoozed', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID)))))'],
        ['is:unread', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID)))))'],
        ['is:read', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID)))))'],
        ['is:chat movie', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID))),MatchFilter(Expr(ID))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('category', () => {
      [
        ['category:primary', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))'],
        ['category:social', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))'],
        ['category:promotions', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))'],
        ['category:updates', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))'],
        ['category:forums', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))'],
        ['category:reservations', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))'],
        ['category:purchases', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Category),Expr(ID)))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('filename', () => {
      [
        ['filename:pdf', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Filename),Expr(ID)))))'],
        ['filename:homework.txt', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Filename),Expr(ID)))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('after', () => {
      testParse('after:2004/04/16', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(After),Expr(Date)))))')
    })

    describe('before', () => {
      testParse('before:2004/04/16', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Before),Expr(Date)))))')
    })

    describe('older', () => {
      testParse('older:2004/04/16', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Older),Expr(Date)))))')
    })

    describe('newer', () => {
      testParse('newer:2004/04/16', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Newer),Expr(Date)))))')
    })

    describe('newer_than', () => {
      testParse('newer_than:2d', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(NewerThan),Expr(ShortID)))))')
    })

    describe('older_than', () => {
      testParse('older_than:2d', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(OlderThan),Expr(ShortID)))))')
    })

    describe('deliveredto', () => {
      testParse('deliveredto:username@gmail.com', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Deliveredto),Expr(Email)))))')
    })

    describe('list', () => {
      testParse('list:info@example.com', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(List),Expr(Email)))))')
    })

    describe('in', () => {
      testParse('in:anywhere movie', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(In),Expr(ID))),MatchFilter(Expr(ID))))')
    })
    
    describe('size', () => {
      testParse('size:1000000', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Size),Expr(Number)))))')
    })

    describe('larger', () => {
      testParse('larger:10M', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Larger),Expr(ShortID)))))')
    })
    
    describe('smaller', () => {
      testParse('smaller:10M', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Smaller),Expr(ShortID)))))')
    })
  })

  describe('String', () => {
    testParse('"dinner movie tonight"', 'Query(FilterExpr(FilterValue(String)))')
  })

  describe('Operators', () => {

    describe('AND', () => {
      testParse('is:important AND label:important', 'Query(QueryFilter(Filter(CompositeFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID))),Intersection,Filter(KeywordFilter(Keyword(Label),Expr(ID)))))))')
    })

    describe('OR', () => {
      testParse('from:amy OR from:david', 'Query(QueryFilter(Filter(CompositeFilter(Filter(KeywordFilter(Keyword(From),Expr(ID))),Union,Filter(KeywordFilter(Keyword(From),Expr(ID)))))))')
    })

    describe('MINUS', () => {
      [
        // ['dinner - movie', 'Query(QueryFilter(CompositeFilter(MINUS(QueryFilter(Filter(FilterExpr(ID))),QueryFilter(Filter(FilterExpr(ID)))))))'],
        ['from:amy - from:david', 'Query(QueryFilter(Filter(CompositeFilter(Filter(KeywordFilter(Keyword(From),Expr(ID))),Difference,Filter(KeywordFilter(Keyword(From),Expr(ID)))))))']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })

    describe('complex queries', () => {
      [
        ['(is:important AND label:important)', 'Query(QueryFilter(QueryFilter(Filter(CompositeFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID))),Intersection,Filter(KeywordFilter(Keyword(Label),Expr(ID))))))))'],
        ['is:important bla', 'Query(QueryFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID))),MatchFilter(Expr(ID))))'],
        ['is:important AND label:important bla', 'Query(QueryFilter(Filter(CompositeFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID))),Intersection,Filter(KeywordFilter(Keyword(Label),Expr(ID))))),MatchFilter(Expr(ID))))'],
        ['(is:important AND label:important) bla', 'Query(QueryFilter(QueryFilter(Filter(CompositeFilter(Filter(KeywordFilter(Keyword(Is),Expr(ID))),Intersection,Filter(KeywordFilter(Keyword(Label),Expr(ID))))))),FilterExpr(FilterValue(ID)))'],
        //['(is:important AND label:important) OR larger:10M', 'Query(QueryFilter(CompositeFilter(OR(QueryFilter(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty))))))),QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchFilter(Empty)))))))'],
        // ['is:important AND (label:important OR larger:10M)', 'Query(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchFilter(Empty))),QueryFilter(QueryFilter(CompositeFilter(OR(QueryFilter(Filter(Keyword(Label),Expr(ID),MatchFilter(Empty))),QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchFilter(Empty)))))))))))'],
        // ['is:important AND (label:important OR larger:10M) matchLabel', '']
      ].forEach(([source, expetec]) => testParse(source, expetec))
    })
  })

})