import { parser } from "../dist/index.js"

const testParse = (string, expected) => {
  it(`parse [${string}] should generate: ${expected}`, () => {
    expect(parser.parse(string).toString()).toEqual(expected)
  })
}

describe('Languague / Rules / Lezer / Parser', () => {

  describe('parse', () => {

    describe('Value nodes', () => {

      describe('Strings node', () => {

        testParse('"a"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
        testParse('"simple string"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
        testParse('"ble ble \n bla"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
        testParse('"true"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
        testParse('"10"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
        testParse('"it"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
        testParse('"24a61ea3-ea35-447c-a7e9-ca3d61cfb1b1"', 'ExprOrImplicitExpr(Expr(Value(Literal(String))))')
      })

      describe('Numbers node', () => {

        testParse('1', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
        testParse('-1', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
        testParse('0.5', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
        testParse('100', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
        testParse('10.2', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
        testParse('100.0212', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
        testParse('-100.0212', 'ExprOrImplicitExpr(Expr(Value(Literal(Number))))')
      })

      describe('Booleans node', () => {

        testParse('true', 'ExprOrImplicitExpr(Expr(Value(Literal(Boolean))))')
        testParse('True', 'ExprOrImplicitExpr(Expr(Value(Literal(Boolean))))')
        testParse('TRUE', 'ExprOrImplicitExpr(Expr(Value(Literal(Boolean))))')
        testParse('false', 'ExprOrImplicitExpr(Expr(Value(Literal(Boolean))))')
        testParse('False', 'ExprOrImplicitExpr(Expr(Value(Literal(Boolean))))')
        testParse('FALSE', 'ExprOrImplicitExpr(Expr(Value(Literal(Boolean))))')
      })
  
      describe('It node', () => {

        testParse('it', 'ExprOrImplicitExpr(Expr(Value(It)))')
        testParse('It', 'ExprOrImplicitExpr(Expr(Value(It)))')
        testParse('IT', 'ExprOrImplicitExpr(Expr(Value(It)))')
      })

      describe('Wildcard node', () => {

        testParse('?', 'ExprOrImplicitExpr(Expr(Value(Wildcard)))')
      })

      describe('Nothing node', () => {

        testParse('nothing', 'ExprOrImplicitExpr(Expr(Value(Nothing)))')
        testParse('Nothing', 'ExprOrImplicitExpr(Expr(Value(Nothing)))')
        testParse('NOTHING', 'ExprOrImplicitExpr(Expr(Value(Nothing)))')
      })
    })

    describe('Variable node', () => {

      testParse('x', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('a1', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('anyWord', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('wi2thNumb3rs', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('_startWithUnderscore', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('falsea', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('iterator', 'ExprOrImplicitExpr(Expr(Variable))')
      testParse('Trueable', 'ExprOrImplicitExpr(Expr(Variable))')
    })

    describe('Special Variable node', () => {

      testParse('<<x>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<a1>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<anyWord>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<wi2thNumb3rs>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<_startWithUnderscore>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<falsea>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<iterator>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<Trueable>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<< anyWord>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<wi 2 thNumb3rs>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<<farm german alive>>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
      testParse('<< a _ b _ c >>', 'ExprOrImplicitExpr(Expr(SpecialVariable))')
    })

    describe('NodeExpr node', () => {

      testParse('choose "id1"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(ChooseNode(NodeRef)))))')
      testParse('executed "id2"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(ExecutedNode(NodeRef)))))')
      testParse('execution_count "id"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))))')
      testParse('last_chosen "id"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(LastChosen(NodeRef)))))')
      testParse('choose "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b1"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(ChooseNode(NodeRef)))))')
      testParse('executed "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b2"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(ExecutedNode(NodeRef)))))')
      testParse('execution_count "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b2"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))))')
      testParse('last_chosen "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b2"', 'ExprOrImplicitExpr(Expr(NodeExpr(NodeKeyword(LastChosen(NodeRef)))))')
    })

    describe('Node operations', () => {

      describe('OfOperator', () => {

        testParse('var of "id"', 'ExprOrImplicitExpr(Expr(NodeExpr(PropFromNode(Property,Of,NodeRef))))')
        testParse('execution_count of "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b1"', 'ExprOrImplicitExpr(Expr(NodeExpr(PropFromNode(Property,Of,NodeRef))))')
        testParse('last_chosen of "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b1"', 'ExprOrImplicitExpr(Expr(NodeExpr(PropFromNode(Property,Of,NodeRef))))')
        testParse('executed of "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b1"', 'ExprOrImplicitExpr(Expr(NodeExpr(PropFromNode(Property,Of,NodeRef))))')
      })

    })

    describe('BooleanExpr', () => {

      testParse('not false', 'ExprOrImplicitExpr(Expr(UnaryExpr(Not(Expr(Value(Literal(Boolean)))))))')
      testParse('true and false', 'ExprOrImplicitExpr(Expr(BinaryExpression(And(Expr(Value(Literal(Boolean))),Expr(Value(Literal(Boolean)))))))')
      testParse('true or false', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(Value(Literal(Boolean))),Expr(Value(Literal(Boolean)))))))')
      testParse('it and true or false', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(BinaryExpression(And(Expr(Value(It)),Expr(Value(Literal(Boolean)))))),Expr(Value(Literal(Boolean)))))))')
      testParse('x or y and z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(Variable),Expr(BinaryExpression(And(Expr(Variable),Expr(Variable))))))))')
      testParse('x and (y or z)', 'ExprOrImplicitExpr(Expr(BinaryExpression(And(Expr(Variable),Expr(ParenExpr(Expr(BinaryExpression(Or(Expr(Variable),Expr(Variable))))))))))')
      testParse('(x and y) or z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(ParenExpr(Expr(BinaryExpression(And(Expr(Variable),Expr(Variable)))))),Expr(Variable)))))')
      testParse('not(x and y) or z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(UnaryExpr(Not(Expr(ParenExpr(Expr(BinaryExpression(And(Expr(Variable),Expr(Variable))))))))),Expr(Variable)))))')
      testParse('not not (x and y) or z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(UnaryExpr(Not(Expr(UnaryExpr(Not(Expr(ParenExpr(Expr(BinaryExpression(And(Expr(Variable),Expr(Variable)))))))))))),Expr(Variable)))))')
      testParse('not (not x and y) or z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(UnaryExpr(Not(Expr(ParenExpr(Expr(BinaryExpression(And(Expr(UnaryExpr(Not(Expr(Variable)))),Expr(Variable))))))))),Expr(Variable)))))')
      testParse('y or not x', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(Variable),Expr(UnaryExpr(Not(Expr(Variable))))))))')

      describe('OrdOrNumberExpr', () => {

        describe('OrdExpr', () => {
          testParse('x > y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Gt(Expr(Variable),Expr(Variable)))))')
          testParse('x < y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Lt(Expr(Variable),Expr(Variable)))))')
          testParse('x >= y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ge(Expr(Variable),Expr(Variable)))))')
          testParse('x <= y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Le(Expr(Variable),Expr(Variable)))))')
          testParse('x == y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))))')
          testParse('? is x', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Value(Wildcard)),Expr(Variable)))))')
          testParse('x is ?', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Value(Wildcard))))))')
          testParse('x is y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))))')
          testParse('? == x', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Value(Wildcard)),Expr(Variable)))))')
          testParse('x == ?', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Value(Wildcard))))))')
          testParse('x != y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ne(Expr(Variable),Expr(Variable)))))')
          testParse('x is not y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ne(Expr(Variable),Expr(Variable)))))')
          testParse('0 < y <= 4', 'ExprOrImplicitExpr(Expr(BinaryExpression(Le(Expr(BinaryExpression(Lt(Expr(Value(Literal(Number))),Expr(Variable)))),Expr(Value(Literal(Number)))))))')
          testParse('x is y is not z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ne(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))),Expr(Variable)))))')
          testParse('x is (y < z)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(ParenExpr(Expr(BinaryExpression(Lt(Expr(Variable),Expr(Variable))))))))))')
          testParse('-x <= z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Le(Expr(UnaryExpr(Neg(Expr(Variable)))),Expr(Variable)))))')
        })
      })

      describe('NumberExpr', () => {

        testParse('x + y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Plus(Expr(Variable),Expr(Variable)))))')
        testParse('x - y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Minus(Expr(Variable),Expr(Variable)))))')
        testParse('x * y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Mul(Expr(Variable),Expr(Variable)))))')
        testParse('x max 2', 'ExprOrImplicitExpr(Expr(BinaryExpression(Max(Expr(Variable),Expr(Value(Literal(Number)))))))')
        testParse('x min y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Min(Expr(Variable),Expr(Variable)))))')
        testParse('x / y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Div(Expr(Variable),Expr(Variable)))))')
        testParse('x % y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Mod(Expr(Variable),Expr(Variable)))))')
        testParse('x + y + z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Plus(Expr(BinaryExpression(Plus(Expr(Variable),Expr(Variable)))),Expr(Variable)))))')
        testParse('x + y * z', 'ExprOrImplicitExpr(Expr(BinaryExpression(Plus(Expr(Variable),Expr(BinaryExpression(Mul(Expr(Variable),Expr(Variable))))))))')
        testParse('x + (y * z)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Plus(Expr(Variable),Expr(ParenExpr(Expr(BinaryExpression(Mul(Expr(Variable),Expr(Variable))))))))))')
        testParse('-x / (y * z)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Div(Expr(UnaryExpr(Neg(Expr(Variable)))),Expr(ParenExpr(Expr(BinaryExpression(Mul(Expr(Variable),Expr(Variable))))))))))')
        testParse('(-x / y) * (2  %  3)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Mul(Expr(ParenExpr(Expr(BinaryExpression(Div(Expr(UnaryExpr(Neg(Expr(Variable)))),Expr(Variable)))))),Expr(ParenExpr(Expr(BinaryExpression(Mod(Expr(Value(Literal(Number))),Expr(Value(Literal(Number))))))))))))')
        testParse('-3 - 3', 'ExprOrImplicitExpr(Expr(BinaryExpression(Minus(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))))')
        testParse('+3 - 3', 'ExprOrImplicitExpr(Expr(BinaryExpression(Minus(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))))')
        testParse('c --a', 'ExprOrImplicitExpr(Expr(BinaryExpression(Minus(Expr(Variable),Expr(UnaryExpr(Neg(Expr(Variable))))))))')
        testParse('x + 2 - y', 'ExprOrImplicitExpr(Expr(BinaryExpression(Minus(Expr(BinaryExpression(Plus(Expr(Variable),Expr(Value(Literal(Number)))))),Expr(Variable)))))')
        testParse('-3 + 3', 'ExprOrImplicitExpr(Expr(BinaryExpression(Plus(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))))')
        testParse('-(2 + 1 +c --a)', 'ExprOrImplicitExpr(Expr(UnaryExpr(Neg(Expr(ParenExpr(Expr(BinaryExpression(Minus(Expr(BinaryExpression(Plus(Expr(BinaryExpression(Plus(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))),Expr(Variable)))),Expr(UnaryExpr(Neg(Expr(Variable)))))))))))))')
        testParse('-2 + 1 +c --a', 'ExprOrImplicitExpr(Expr(BinaryExpression(Minus(Expr(BinaryExpression(Plus(Expr(BinaryExpression(Plus(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))),Expr(Variable)))),Expr(UnaryExpr(Neg(Expr(Variable))))))))')
      })
    })

    describe('Case Exprs', () => {

      testParse(`
        when true then false
        otherwise true
      `, 'ExprOrImplicitExpr(Expr(CasesExpr(When(Expr(Value(Literal(Boolean))),Expr(Value(Literal(Boolean)))),Otherwise(Expr(Value(Literal(Boolean)))))))')

      testParse(`
        when a and b then 4
        otherwise 42
      `, 'ExprOrImplicitExpr(Expr(CasesExpr(When(Expr(BinaryExpression(And(Expr(Variable),Expr(Variable)))),Expr(Value(Literal(Number)))),Otherwise(Expr(Value(Literal(Number)))))))')

      testParse(`
        when execution_count "A" is 1 then true
        otherwise false
      `, 'ExprOrImplicitExpr(Expr(CasesExpr(When(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(Boolean)))),Otherwise(Expr(Value(Literal(Boolean)))))))')

      testParse(`
        when execution_count "A" is 1 then "A"
        when execution_count "B" is 1 then "B"
        otherwise "C"
      `, 'ExprOrImplicitExpr(Expr(CasesExpr(When(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(String)))),When(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(String)))),Otherwise(Expr(Value(Literal(String)))))))')

      testParse(`
        when execution_count "A" is 1 then true
        otherwise
        when execution_count "B" is 1 then false
        otherwise true
      `, 'ExprOrImplicitExpr(Expr(CasesExpr(When(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(Boolean)))),Otherwise(Expr(CasesExpr(When(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(Boolean)))),Otherwise(Expr(Value(Literal(Boolean))))))))))')

      testParse(`
        when
          when execution_count "A" is 1 then true
          otherwise false
          then true
        otherwise false
      `, 'ExprOrImplicitExpr(Expr(CasesExpr(When(Expr(CasesExpr(When(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(ExecutionCount(NodeRef)))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(Boolean)))),Otherwise(Expr(Value(Literal(Boolean)))))),Expr(Value(Literal(Boolean)))),Otherwise(Expr(Value(Literal(Boolean)))))))')
    })

    describe('Infix Exprs', () => {

      testParse('> x', 'ExprOrImplicitExpr(ImplicitExpr(Gt(Expr(Variable))))')
      testParse('> (it == 2)', 'ExprOrImplicitExpr(ImplicitExpr(Gt(Expr(ParenExpr(Expr(BinaryExpression(Eq(Expr(Value(It)),Expr(Value(Literal(Number)))))))))))')
      testParse('is x', 'ExprOrImplicitExpr(ImplicitExpr(Eq(Expr(Variable))))')
      testParse('is ?', 'ExprOrImplicitExpr(ImplicitExpr(Eq(Expr(Value(Wildcard)))))')
      testParse('!= x', 'ExprOrImplicitExpr(ImplicitExpr(Ne(Expr(Variable))))')
      testParse('is not x', 'ExprOrImplicitExpr(ImplicitExpr(Ne(Expr(Variable))))')
      testParse('== x', 'ExprOrImplicitExpr(ImplicitExpr(Eq(Expr(Variable))))')
      testParse('== ?', 'ExprOrImplicitExpr(ImplicitExpr(Eq(Expr(Value(Wildcard)))))')
      testParse('!= "string"', 'ExprOrImplicitExpr(ImplicitExpr(Ne(Expr(Value(Literal(String))))))')
      testParse('is (1 max 2)', 'ExprOrImplicitExpr(ImplicitExpr(Eq(Expr(ParenExpr(Expr(BinaryExpression(Max(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))))))))')
    })

    describe('Fact application', () => {

      testParse('x()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('a1 ()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('anyWord()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('wi2thNumb3rs()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('_startWithUnderscore()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('falsea()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('iterator()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
      testParse('Trueable()', 'ExprOrImplicitExpr(Expr(FactApp(Variable)))')
    })

    describe('Complete Combinations', () => {

      testParse('(x is not z) and x == y', 'ExprOrImplicitExpr(Expr(BinaryExpression(And(Expr(ParenExpr(Expr(BinaryExpression(Ne(Expr(Variable),Expr(Variable)))))),Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable))))))))')
      testParse('x is not (z and x == y)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ne(Expr(Variable),Expr(ParenExpr(Expr(BinaryExpression(And(Expr(Variable),Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))))))))))))')
      testParse('2 + 3 is true or false', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(BinaryExpression(Eq(Expr(BinaryExpression(Plus(Expr(Value(Literal(Number))),Expr(Value(Literal(Number)))))),Expr(Value(Literal(Boolean)))))),Expr(Value(Literal(Boolean)))))))')
      testParse('george is dead', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))))')
      testParse('george is dead and age > 18', 'ExprOrImplicitExpr(Expr(BinaryExpression(And(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))),Expr(BinaryExpression(Gt(Expr(Variable),Expr(Value(Literal(Number))))))))))')
      testParse('it is mike or weapon is gun', 'ExprOrImplicitExpr(Expr(BinaryExpression(Or(Expr(BinaryExpression(Eq(Expr(Value(It)),Expr(Variable)))),Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable))))))))')
      testParse('it is nico', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Value(It)),Expr(Variable)))))')
      testParse('it is "nico"', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Value(It)),Expr(Value(Literal(String)))))))')
      testParse('it is not javi', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ne(Expr(Value(It)),Expr(Variable)))))')
      testParse('phone is calling', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(Variable)))))')
      testParse('last_chosen "id" is id_var', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(NodeExpr(NodeKeyword(LastChosen(NodeRef)))),Expr(Variable)))))')
      testParse('prop of "24a61ea3-ea35-447c-a7e9-ca3d61cfb1b1" is 42', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(NodeExpr(PropFromNode(Property,Of,NodeRef))),Expr(Value(Literal(Number)))))))')
      testParse('fede is (not not sleeping)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Eq(Expr(Variable),Expr(ParenExpr(Expr(UnaryExpr(Not(Expr(UnaryExpr(Not(Expr(Variable)))))))))))))')
      testParse('fede is not (not sleeping)', 'ExprOrImplicitExpr(Expr(BinaryExpression(Ne(Expr(Variable),Expr(ParenExpr(Expr(UnaryExpr(Not(Expr(Variable))))))))))')
    })

  })
})