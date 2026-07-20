module.exports = function handler(req, res) {
  const { id } = req.query
  
  // If id is provided, return single component
  if (id) {
    const componentData = {
      id: id,
      name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
      description: `Documentation for ${id} component`,
      variants: [],
      props: [],
      events: []
    }
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(componentData)
  }
  
  // Otherwise return all components
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
  
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ components })
}
