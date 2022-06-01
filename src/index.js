import {LRLanguage, LanguageSupport } from "@codemirror/language"
import { parserWithMetadata } from './parser'
import { makeQuery } from './model/query'
import { autocompletion } from '@codemirror/autocomplete'
import { evalQuery, evalSourceQuery } from './model/queryInterpreter'
import { keywordsAutocompletes, operatorAutcompletes, labelsAutocompletes } from './autocomplete/autocomplete'

export const parser = parserWithMetadata

const GmailLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    closeBrackets: { brackets: ['(', "'", '"', '`'] },
  }
})

const autocompleteExtension = context => autocompletion({
  icons: true,
  override: [
    keywordsAutocompletes, // Suggest possible keywords for cases like 'l[|]'
    operatorAutcompletes, // Suggest possible operators for cases like 'label:something [|]'
    labelsAutocompletes(context), // Suggest possible labels for cases like 'label:[|]'
  ],
})

export const Gmail = context => new LanguageSupport(GmailLanguage, [ autocompleteExtension(context) ])

export default {
  Gmail,
  parser,
  makeQuery,
  evalSourceQuery,
  evalQuery
}