import {LRLanguage, LanguageSupport } from "@codemirror/language"
import { parserWithMetadata } from './parser'
import { makeQuery as _makeQuery, sourceToQuery as _sourceToQuery } from './model/query'
import { evalQuery as _evalQuery, evalLangQuery as _evalLangQuery } from './model/queryInterpreter'

export const parser = parserWithMetadata
export const evalQuery = _evalQuery
export const evalLangQuery = _evalLangQuery
export const makeQuery = _makeQuery
export const sourceToQuery = _sourceToQuery

const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {}
})

export const Gmail = extensions => new LanguageSupport(GmailLanguage, extensions)

export default {
  Gmail,
  parser,
  makeQuery,
  sourceToQuery,
  evalQuery,
  evalLangQuery
}