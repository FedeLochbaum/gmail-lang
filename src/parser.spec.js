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
      testParse('from:amy', 'Query(QueryFilter(Filter(Keyword(From),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('to', () => {
      testParse('to:david', 'Query(QueryFilter(Filter(Keyword(To),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('cc', () => {
      testParse('cc:david', 'Query(QueryFilter(Filter(Keyword(Cc),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('bcc', () => {
      testParse('bcc:david', 'Query(QueryFilter(Filter(Keyword(Bcc),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('label', () => {
      testParse('label:friends', 'Query(QueryFilter(Filter(Keyword(Label),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('subject', () => {
      testParse('subject:dinner', 'Query(QueryFilter(Filter(Keyword(Subject),Expr(ID),MatchArgument(NoArgument))))')
      testParse('subject:(dinner OR movie)', 'Query(QueryFilter(Filter(Keyword(Subject),Expr(ExprOp(BinaryOp(OR(Expr(ID),Expr(ID))))),MatchArgument(NoArgument))))')
    })
    
    describe('has', () => {
      testParse('has:attachment', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:drive', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:document', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:spreadsheet', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:presentation', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:youtube', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:userlabels', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
      testParse('has:nouserlabels', 'Query(QueryFilter(Filter(Keyword(Has),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('is', () => {
      testParse('is:starred', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))))')
      testParse('is:snoozed', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))))')
      testParse('is:unread', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))))')
      testParse('is:read', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))))')
      testParse('is:chat movie', 'Query(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(Argument(Expr(ID))))))')
    })

    describe('category', () => {
      testParse('category:primary', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
      testParse('category:social', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
      testParse('category:promotions', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
      testParse('category:updates', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
      testParse('category:forums', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
      testParse('category:reservations', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
      testParse('category:purchases', 'Query(QueryFilter(Filter(Keyword(Category),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('filename', () => {
      testParse('filename:pdf', 'Query(QueryFilter(Filter(Keyword(Filename),Expr(ID),MatchArgument(NoArgument))))')
      testParse('filename:homework.txt', 'Query(QueryFilter(Filter(Keyword(Filename),Expr(ID),MatchArgument(NoArgument))))')
    })

    describe('after', () => {
      testParse('after:2004/04/16', 'Query(QueryFilter(Filter(Keyword(After),Expr(Date),MatchArgument(NoArgument))))')
    })

    describe('before', () => {
      testParse('before:2004/04/16', 'Query(QueryFilter(Filter(Keyword(Before),Expr(Date),MatchArgument(NoArgument))))')
    })

    describe('older', () => {
      testParse('older:2004/04/16', 'Query(QueryFilter(Filter(Keyword(Older),Expr(Date),MatchArgument(NoArgument))))')
    })

    describe('newer', () => {
      testParse('newer:2004/04/16', 'Query(QueryFilter(Filter(Keyword(Newer),Expr(Date),MatchArgument(NoArgument))))')
    })

    describe('newer_than', () => {
      testParse('newer_than:2d', 'Query(QueryFilter(Filter(Keyword(NewerThan),Expr(ShortID),MatchArgument(NoArgument))))')
    })

    describe('older_than', () => {
      testParse('older_than:2d', 'Query(QueryFilter(Filter(Keyword(OlderThan),Expr(ShortID),MatchArgument(NoArgument))))')
    })

    describe('deliveredto', () => {
      testParse('deliveredto:username@gmail.com', 'Query(QueryFilter(Filter(Keyword(Deliveredto),Expr(Email),MatchArgument(NoArgument))))')
    })

    describe('list', () => {
      testParse('list:info@example.com', 'Query(QueryFilter(Filter(Keyword(List),Expr(Email),MatchArgument(NoArgument))))')
    })

    describe('in', () => {
      testParse('in:anywhere movie', 'Query(QueryFilter(Filter(Keyword(In),Expr(ID),MatchArgument(Argument(Expr(ID))))))')
    })
    
    describe('size', () => {
      testParse('size:1000000', 'Query(QueryFilter(Filter(Keyword(Size),Expr(Number),MatchArgument(NoArgument))))')
    })

    describe('larger', () => {
      testParse('larger:10M', 'Query(QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchArgument(NoArgument))))')
    })
    
    describe('smaller', () => {
      testParse('smaller:10M', 'Query(QueryFilter(Filter(Keyword(Smaller),Expr(ShortID),MatchArgument(NoArgument))))')
    })
  })

  describe('String', () => {
    testParse('"dinner movie tonight"', 'Query(QueryFilter(Filter(FilterExpr(String))))')
  })

  describe('Operators', () => {

    describe('AND', () => {
      testParse('is:important AND label:important', 'Query(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchArgument(NoArgument)))))))')
    })

    describe('OR', () => {
      testParse('from:amy OR from:david', 'Query(QueryFilter(CompositeFilter(OR(QueryFilter(Filter(Keyword(From),Expr(ID),MatchArgument(NoArgument))),QueryFilter(Filter(Keyword(From),Expr(ID),MatchArgument(NoArgument)))))))')
    })

    describe('MINUS', () => {
      testParse('dinner - movie', 'Query(QueryFilter(CompositeFilter(MINUS(QueryFilter(Filter(FilterExpr(ID))),QueryFilter(Filter(FilterExpr(ID)))))))')
      testParse('from:amy - from:david', 'Query(QueryFilter(CompositeFilter(MINUS(QueryFilter(Filter(Keyword(From),Expr(ID),MatchArgument(NoArgument))),QueryFilter(Filter(Keyword(From),Expr(ID),MatchArgument(NoArgument)))))))')
    })

    describe('complex queries', () => {
      testParse('(is:important AND label:important)', 'Query(QueryFilter(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchArgument(NoArgument))))))))')
      testParse('(is:important AND label:important) OR larger:10M', 'Query(QueryFilter(CompositeFilter(OR(QueryFilter(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))),QueryFilter(Filter(Keyword(Label),Expr(ID),MatchArgument(NoArgument))))))),QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchArgument(NoArgument)))))))')
      testParse('is:important AND (label:important OR larger:10M)', 'Query(QueryFilter(CompositeFilter(AND(QueryFilter(Filter(Keyword(Is),Expr(ID),MatchArgument(NoArgument))),QueryFilter(QueryFilter(CompositeFilter(OR(QueryFilter(Filter(Keyword(Label),Expr(ID),MatchArgument(NoArgument))),QueryFilter(Filter(Keyword(Larger),Expr(ShortID),MatchArgument(NoArgument)))))))))))')
      testParse('is:important AND (label:important OR larger:10M) matchLabel', '')
    })
  })

})