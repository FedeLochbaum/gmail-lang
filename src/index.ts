import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import { parserWithMetadata } from './parser'

export const parser = parserWithMetadata

export const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: {line: ";"}
  }
})

export default () => new LanguageSupport(GmailLanguage)
