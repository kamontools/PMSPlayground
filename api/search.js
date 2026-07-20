module.exports = function handler(req, res) {
  const { q } = req.query
  
  const results = [
    {
      title: 'InputText',
      url: '/components/inputtext',
      category: 'Components',
      excerpt: 'Text input component for user data entry'
    },
    {
      title: 'Button',
      url: '/components/button',
      category: 'Components',
      excerpt: 'Primary and secondary button variants'
    }
  ]
  
  const filtered = results.filter(item => 
    item.title.toLowerCase().includes(q?.toLowerCase() || '') ||
    item.excerpt.toLowerCase().includes(q?.toLowerCase() || '')
  )
  
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ results: filtered, query: q })
}
