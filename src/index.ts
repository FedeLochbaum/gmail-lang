import {LRLanguage, LanguageSupport } from "@codemirror/language"
import { Extension } from "@codemirror/state"
import { parserWithMetadata } from './parser'
import { makeQuery } from './model/query'
import { evalQuery } from './model/queryInterpreter'

export const parser = parserWithMetadata

const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {}
})

export const Gmail = (extensions: [Extension]) => new LanguageSupport(GmailLanguage, extensions)

export default {
  Gmail,
  parser,
  makeQuery,
  evalQuery
}