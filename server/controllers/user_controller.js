module.exports = {
    playerList: (req, res) => {

        let { id } = req.params
        id = parseInt(id)
        const db = req.app.get('db')
        db.players.get_players({ id: id }).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    },

    playerProfile: (req, res) => {
        let { id } = req.params
        id = parseInt(id)
        const db = req.app.get('db')
        db.users.get_profile({ id: id }).then(
            resp => {
                res.status(200).send(resp[0])
            }
        )
    },

    friendsList: (req, res) => {

        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.users.get_friends({ id: id }).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    },

    addFriend: (req, res) => {
        let { id } = req.params
        let { friendId } = req.body
        const db = req.app.get('db')
        id = parseInt(id)
        friendId = parseInt(friendId)

        db.users.get_friends({ id: id, friend_id: friendId }).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    },

    getMyInfo: (req, res) => {
        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.users.get_my_info({ id: id }).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    },

    submitProfileChanges: (req, res) => {
        const { birth_year, location, rating, rating_type, about, singles, mixed, gender, open, phone, email } = req.body
        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.users.update_profile({ id, birth_year, location, rating, rating_type, about, singles, mixed, gender, open, phone, email }).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    }


}