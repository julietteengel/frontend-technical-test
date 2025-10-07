const path = require('path')
const fs = require('fs')

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  const dbPath = path.join(__dirname, '../db.json')
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = parseInt(req.query?.senderId, 10)
    const result = db?.conversations?.filter(
      conv => conv.senderId === userId || conv.recipientId === userId
    )

    res.status(200).json(result)
    return
  }

  if (req.url === '/conversations' && req.method === 'POST') {
    const { senderId, recipientId } = req.body

    // Generate new conversation
    const newConversation = {
      id: db.conversations.length > 0 ? Math.max(...db.conversations.map(c => c.id)) + 1 : 1,
      senderId,
      recipientId,
      lastMessageTimestamp: Math.floor(Date.now() / 1000)
    }

    db.conversations.push(newConversation)
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

    res.status(201).json(newConversation)
    return
  }

  next()
}
