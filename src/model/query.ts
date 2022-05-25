
import { parser } from "../../dist/index.js"

export const sourceToQuery = (source: string) => makeQuery(parser.parse(source))

export const makeQuery = (tree: any) => {
  // todo: itearte the tree and generate a tree representation of the query
}

