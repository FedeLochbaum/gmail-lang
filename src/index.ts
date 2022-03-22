import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import { parserWithMetadata } from './parser'

export const parser = parserWithMetadata

const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {}
})

export default () => new LanguageSupport(GmailLanguage)
