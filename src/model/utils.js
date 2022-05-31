import { EditorState } from '@codemirror/state'

export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

export const currentTextNode = (state, current) => state.sliceDoc(current.from, current.to)

export const editoStateFrom = ({ source }) => EditorState.create({ doc: source })

export const isOneOf = types => node => {
  if (!node) return false

  const { name, firstChild, lastChild } = node

  return includes(name, types) || !!(firstChild && equalNodes(firstChild, lastChild) && isOneOf(types)(firstChild))
}

export const isOfType = _type => node => {
  if (!node) return false

  const { name, firstChild, lastChild } = node

  return name === _type || !!(firstChild && equalNodes(firstChild, lastChild) && isOfType(_type)(firstChild))
}

const firstSiblingTo = to => (initialNode, admitErrorNode = true) => {
  const getTo = ({ firstChild, lastChild }) => (to === LEFT ? firstChild : lastChild)
  const getInverse = ({ firstChild, lastChild }) => (to === LEFT ? lastChild : firstChild)

  let current = initialNode
  let currentParent = current.parent

  // We go up until find a {TO} sibling
  while (currentParent && equalNodes(getTo(currentParent), current)) {
    current = currentParent
    currentParent = currentParent.parent
  }

  if (!currentParent) return

  // Select my {TO} sibling
  current = to === LEFT ? current.prevSibling : current.nextSibling

  // Go down as much as possible to the {INVERSE}
  while (getInverse(current)) {
    current = getInverse(current)
  }

  // Doesn't makes sense if the found sibling its itself
  if (equalNodes(initialNode, current)) return

  // If we want to return the first that is not an error, we have to call recursively
  if (!admitErrorNode && isError(current)) return firstSiblingTo(to)(current, admitErrorNode)

  return current
}

export const firstSibilingToLeft = firstSiblingTo(LEFT)
export const firstSibilingToRight = firstSiblingTo(RIGHT)