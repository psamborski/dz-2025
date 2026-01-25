export const searchNotes = (categories, query, language) => {
  if (!query.trim()) return []

  const q = query.toLowerCase()
  const results = []

  categories.forEach(category => {
    category.groups.forEach(group => {
      group.notes.forEach(note => {
        const langData = note[language] || {}

        const title =
          typeof langData.name === 'string'
            ? langData.name.toLowerCase()
            : ''

        const descriptionText =
          typeof langData.description === 'string'
            ? langData.description.toLowerCase()
            : extractPlainTextFromRichText(langData.description?.json)

        if (title.includes(q) || descriptionText.includes(q)) {
          results.push({
            note,
            category: {
              id: category.id,
              name: category[language]
            },
            group: {
              id: group.id,
              name: group[language]
            }
          })
        }
      })
    })
  })

  return results
}

export const extractPlainTextFromRichText = richText => {
  if (!richText || typeof richText !== 'object') return ''

  const walk = node => {
    if (!node) return ''
    if (node.nodeType === 'text') return node.value || ''
    if (!node.content) return ''
    return node.content.map(walk).join(' ')
  }

  return walk(richText).toLowerCase()
}