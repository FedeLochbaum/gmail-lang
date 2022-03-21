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
      testParse('from:amy', 'Query(Filter(Keyword(From),Expr(ID),FilterArgument))')
    })

    describe('to', () => {
      testParse('to:david', 'Query(Filter(Keyword(To),Expr(ID),FilterArgument))')
    })

    describe('cc', () => {
      testParse('cc:david', 'Query(Filter(Keyword(Cc),Expr(ID),FilterArgument))')
    })

    describe('bcc', () => {
      testParse('bcc:david', 'Query(Filter(Keyword(Bcc),Expr(ID),FilterArgument))')
    })

    describe('label', () => {
      testParse('label:friends', 'Query(Filter(Keyword(Label),Expr(ID),FilterArgument))')
    })

    describe('subject', () => {
      testParse('subject:dinner', 'Query(Filter(Keyword(Subject),Expr(ID),FilterArgument))')
      testParse('subject:(dinner movie)', '')
    })
    
    describe('has', () => {
      testParse('has:attachment', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Attachment)),FilterArgument))')
      testParse('has:drive', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Drive)),FilterArgument))')
      testParse('has:document', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Document)),FilterArgument))')
      testParse('has:spreadsheet', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Spreadsheet)),FilterArgument))')
      testParse('has:presentation', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Presentation)),FilterArgument))')
      testParse('has:youtube', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Youtube)),FilterArgument))')
      testParse('has:userlabels', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Userlabels)),FilterArgument))')
      testParse('has:nouserlabels', 'Query(Filter(Keyword(Has),Expr(ExprKeyword(Nouserlabels)),FilterArgument))')
    })

    describe('is', () => {
      testParse('is:starred', 'Query(Filter(Keyword(Is),Expr(ExprKeyword(Starred)),FilterArgument))')
      testParse('is:snoozed', 'Query(Filter(Keyword(Is),Expr(ExprKeyword(Snoozed)),FilterArgument))')
      testParse('is:unread', 'Query(Filter(Keyword(Is),Expr(ExprKeyword(Unread)),FilterArgument))')
      testParse('is:read', 'Query(Filter(Keyword(Is),Expr(ExprKeyword(Read)),FilterArgument))')
      testParse('is:chat movie', 'Query(Filter(Keyword(Is),Expr(ExprKeyword(Chat)),FilterArgument(Expr(ID))))')
    })

    describe('category', () => {
      testParse('category:primary', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Primary)),FilterArgument))')
      testParse('category:social', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Social)),FilterArgument))')
      testParse('category:promotions', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Promotions)),FilterArgument))')
      testParse('category:updates', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Updates)),FilterArgument))')
      testParse('category:forums', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Forums)),FilterArgument))')
      testParse('category:reservations', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Reservations)),FilterArgument))')
      testParse('category:purchases', 'Query(Filter(Keyword(Category),Expr(ExprKeyword(Purchases)),FilterArgument))')
    })

    describe('filename', () => {
      testParse('filename:pdf', 'Query(Filter(Keyword(Filename),Expr(ID),FilterArgument))')
      testParse('filename:homework.txt', 'Query(Filter(Keyword(Filename),Expr(ID),FilterArgument))')
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
      testParse('newer_than:2d', '')
    })

    describe('older_than', () => {
      testParse('older_than:2d', '')
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
      testParse('size:1000000', 'Query(Filter(Keyword(Size),Expr(Number),FilterArgument))')
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
      testParse('is:important AND label:important', '')
    })

    describe('OR', () => {
      testParse('from:amy OR from:david', '')
    })

    describe('MINUS', () => {
      testParse('dinner - movie', '')
    })
  })

})