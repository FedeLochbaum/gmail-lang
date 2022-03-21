import { parser } from "../dist/index.js"

const testParse = (string, expected) => {
  it(`parse [${string}] should generate: ${expected}`, () => {
    expect(parser.parse(string).toString()).toEqual(expected)
  })
}

describe('Gmail / parser', () => {

  describe('Exact match', () => {

    describe('+ operator', () => {
      testParse('+unicorn', 'Query(Filter(FilterExpr(ExactMatch(FilterExpr(ID)))))')
    })
  })

  describe('keyword', () => {

    describe('from', () => {
      testParse('from:amy', 'Query(Filter(Keyword(From),Expr(ID),MatchArgument))')
    })

    describe('to', () => {
      testParse('to:david', 'Query(Filter(Keyword(To),Expr(ID),MatchArgument))')
    })

    describe('cc', () => {
      testParse('cc:david', 'Query(Filter(Keyword(Cc),Expr(ID),MatchArgument))')
    })

    describe('bcc', () => {
      testParse('bcc:david', 'Query(Filter(Keyword(Bcc),Expr(ID),MatchArgument))')
    })

    describe('label', () => {
      testParse('label:friends', 'Query(Filter(Keyword(Label),Expr(ID),MatchArgument))')
    })

    describe('subject', () => {
      testParse('subject:dinner', 'Query(Filter(Keyword(Subject),Expr(ID),MatchArgument))')
      testParse('subject:(dinner OR movie)', 'Query(Filter(Keyword(Subject),Expr(ExprOp(BinaryOp(OrOp(Expr(ID),Expr(ID))))),MatchArgument))')
    })
    
    describe('has', () => {
      testParse('has:attachment', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:drive', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:document', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:spreadsheet', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:presentation', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:youtube', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:userlabels', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
      testParse('has:nouserlabels', 'Query(Filter(Keyword(Has),Expr(ID),MatchArgument))')
    })

    describe('is', () => {
      testParse('is:starred', 'Query(Filter(Keyword(Is),Expr(ID),MatchArgument))')
      testParse('is:snoozed', 'Query(Filter(Keyword(Is),Expr(ID),MatchArgument))')
      testParse('is:unread', 'Query(Filter(Keyword(Is),Expr(ID),MatchArgument))')
      testParse('is:read', 'Query(Filter(Keyword(Is),Expr(ID),MatchArgument))')
      testParse('is:chat movie', 'Query(Filter(Keyword(Is),Expr(ID),MatchArgument(Expr(ID))))')
    })

    describe('category', () => {
      testParse('category:primary', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
      testParse('category:social', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
      testParse('category:promotions', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
      testParse('category:updates', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
      testParse('category:forums', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
      testParse('category:reservations', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
      testParse('category:purchases', 'Query(Filter(Keyword(Category),Expr(ID),MatchArgument))')
    })

    describe('filename', () => {
      testParse('filename:pdf', 'Query(Filter(Keyword(Filename),Expr(ID),MatchArgument))')
      testParse('filename:homework.txt', 'Query(Filter(Keyword(Filename),Expr(ID),MatchArgument))')
    })

    describe('after', () => {
      testParse('after:2004/04/16', '')
      testParse('after:04/16/2004', '')
    })

    describe('before', () => {
      testParse('before:2004/04/16', '')
      testParse('before:04/16/2004', '')
    })

    describe('older', () => {
      testParse('older:2004/04/16', '')
      testParse('older:04/16/2004', '')
    })

    describe('newer', () => {
      testParse('newer:2004/04/16', '')
      testParse('newer:04/16/2004', '')
    })

    describe('newer_than', () => {
      testParse('newer_than:2d', 'Query(Filter(Keyword(Newer_than),Expr(ID),MatchArgument))')
    })

    describe('older_than', () => {
      testParse('older_than:2d', 'Query(Filter(Keyword(Older_than),Expr(ID),MatchArgument))')
    })

    describe('deliveredto', () => {
      testParse('deliveredto:username@gmail.com', '')
    })

    describe('list', () => {
      testParse('list:info@example.com', '')
    })

    describe('in', () => {
      testParse('in:anywhere movie', '')
    })
    
    describe('size', () => {
      testParse('size:1000000', 'Query(Filter(Keyword(Size),Expr(Number),MatchArgument))')
    })

    describe('larger', () => {
      testParse('larger:10M', '')
    })
    
    describe('smaller', () => {
      testParse('smaller:10M', '')
    })
  })

  describe('String', () => {
    testParse('"dinner movie tonight"', 'Query(Filter(FilterExpr(String)))')
  })

  describe('Operators', () => {

    describe('AND', () => {
      testParse('is:important AND label:important', 'Query(FilterWithOp(FilterAndOp(Filter(Keyword(Is),Expr(ID),MatchArgument),Filter(Keyword(Label),Expr(ID),MatchArgument))))')
    })

    describe('OR', () => {
      testParse('from:amy OR from:david', 'Query(FilterWithOp(FilterOrOp(Filter(Keyword(From),Expr(ID),MatchArgument),Filter(Keyword(From),Expr(ID),MatchArgument))))')
    })

    describe('MINUS', () => {
      testParse('dinner - movie', 'Query(FilterWithOp(FilterMinus(Filter(FilterExpr(ID)),Filter(FilterExpr(ID)))))')
    })
  })

})