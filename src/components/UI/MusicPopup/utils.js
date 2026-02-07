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

export const detectMusicService = url => {
  if (!url || typeof url !== 'string') return 'external'

  const normalizedUrl = url.toLowerCase()

  // YouTube (all common variants)
  if (
    normalizedUrl.includes('youtube.com') ||
    normalizedUrl.includes('youtu.be') ||
    normalizedUrl.includes('youtube-nocookie.com') ||
    normalizedUrl.includes('music.youtube.com')
  ) {
    return 'youtube'
  }

  // Spotify (including short links)
  if (
    normalizedUrl.includes('spotify.com') ||
    normalizedUrl.includes('spotify.link')
  ) {
    return 'spotify'
  }

  // Apple Music / iTunes
  if (
    normalizedUrl.includes('music.apple.com') ||
    normalizedUrl.includes('itunes.apple.com')
  ) {
    return 'apple'
  }

  // SoundCloud
  if (normalizedUrl.includes('soundcloud.com')) {
    return 'soundcloud'
  }

  // Bandcamp
  if (normalizedUrl.includes('bandcamp.com')) {
    return 'bandcamp'
  }

  // Deezer
  if (normalizedUrl.includes('deezer.com')) {
    return 'deezer'
  }

  // Tidal
  if (normalizedUrl.includes('tidal.com')) {
    return 'tidal'
  }

  // Amazon Music
  if (
    normalizedUrl.includes('music.amazon.') ||
    normalizedUrl.includes('amazon.com')
  ) {
    return 'amazon'
  }

  // Vimeo (video performances)
  if (normalizedUrl.includes('vimeo.com')) {
    return 'vimeo'
  }

  // Mixcloud
  if (normalizedUrl.includes('mixcloud.com')) {
    return 'mixcloud'
  }

  return 'external'
}