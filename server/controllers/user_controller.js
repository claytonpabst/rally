module.exports = {
    playerList: (req, res) => {
        console.log('hit get player')
        const db = req.app.get('db')
        db.players.get_players().then(
            resp => {
                res.status(200).send(resp)
            }
        )
    },

    friendsList: (req, res) => {
        console.log(req.params)
        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.users.get_friends({ id: id }).then(
            resp => {
                console.log(resp)
                res.status(200).send(resp)
            }
        )
    }


}