module.exports = {
    getMessages: (req, res) => {
        console.log('hit getMessages,', req.params)
        let { room } = req.params
        const db = req.app.get('db')

        db.chat.get_chat({ room: room }).then(
            chat => {
                console.log('chat res', chat)
                res.status(200).send(chat)
            }
        )
    }
}