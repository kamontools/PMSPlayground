module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ 
    status: 'ok', 
    message: 'ERP Components Bible API is running' 
  })
}
