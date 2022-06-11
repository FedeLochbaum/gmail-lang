import {LRLanguage, LanguageSupport } from "@codemirror/language"
import { Extension } from "@codemirror/state"
import { parserWithMetadata } from './parser'

export const parser = parserWithMetadata

const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {}
})

export default (extensions: [Extension]) => new LanguageSupport(GmailLanguage, extensions)
