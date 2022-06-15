import {LRLanguage, LanguageSupport } from "@codemirror/language"
import { parserWithMetadata } from './parser'
import { makeQuery, sourceToQuery } from './model/query'
import { evalQuery } from './model/queryInterpreter'

export const parser = parserWithMetadata

const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {}
})

export const Gmail = extensions => new LanguageSupport(GmailLanguage, extensions)

export default {
  Gmail,
  parser,
  makeQuery,
  evalQuery,
  sourceToQuery
}