import {parser} from "./syntax.grammar"
import tokenStyle from './style'

export const parserWithMetadata = parser.configure({ props: [tokenStyle] })

export const parse = (source: string) => parserWithMetadata.parse(source)