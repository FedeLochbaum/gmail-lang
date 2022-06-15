# Gmail query language

### This Project only provides

- The LR Lezer grammar for the Gmail query language
- The code mirror language extension
- An AST query transformer to an intermedia representation
- A query interpreter to evaluate mail queries from the intermedia representation

### Getting started

Install the npm package

```
npm i gmail-lang

yarn add gmail-lang
```

Import the gmail language from your code and use it.

```
import { Gmail } from 'gmail-lang'
```

The package also exports:

- `Gmail` which is the code mirror language extension
- `parser` which is the Lezer Gmail parser to create a Lezer tree from the source code
- `makeQuery`, is a function which receives the code mirror state, a tree and returns the respective query
- `sourceToQuery` is a function which receives the source code and returns the corresponding Gmail query
- `evalQuery` is a function which receives a query, a data source and evaluates the query returning the result of evaluating the query.

The data source must respect the next interface:

- `filterByMatch`
- `allByKeyword`
- `intersection`
- `union`
- `difference`
