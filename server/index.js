import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ERP Components Bible API is running' })
})

// Search API (for future search functionality)
app.get('/api/search', (req, res) => {
  const { q } = req.query
  
  // Mock search results
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
  
  res.json({ results: filtered, query: q })
})

// Component data API (for dynamic component loading)
app.get('/api/components', (req, res) => {
  const components = [
    { id: 'inputtext', name: 'InputText', category: 'Form' },
    { id: 'button', name: 'Button', category: 'Button' },
    { id: 'dropdown', name: 'Dropdown', category: 'Form' },
    { id: 'calendar', name: 'Calendar', category: 'Form' },
    { id: 'checkbox', name: 'Checkbox', category: 'Form' },
    { id: 'modal', name: 'Modal', category: 'Overlay' },
    { id: 'tag', name: 'Tag', category: 'Data Display' },
    { id: 'header', name: 'Header', category: 'Layout' },
    { id: 'inline-message', name: 'InlineMessage', category: 'Feedback' },
    { id: 'input-switch', name: 'InputSwitch', category: 'Form' },
    { id: 'autocomplete', name: 'AutoComplete', category: 'Form' },
    { id: 'search-box', name: 'SearchBox', category: 'Form' }
  ]
  
  res.json({ components })
})

app.get('/api/components/:id', (req, res) => {
  const { id } = req.params
  
  // Mock component data
  const componentData = {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    description: `Documentation for ${id} component`,
    variants: [],
    props: [],
    events: []
  }
  
  res.json(componentData)
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
})

