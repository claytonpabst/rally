module.exports = {
    getFriendsToInvite: (req, res) => {
        // console.log(req.params)
        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.games.get_friends_to_invite({ id: id }).then(
            resp => {
                // console.log(resp)
                res.status(200).send(resp)
            }
        )
    },

    invite: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db')
        let matchInfo = req.body.matchInfo


        await db.games.create_match({
            organizer_id: req.body.matchInfo.coordinatorId,
            time_limit: 60,
            priority_scheduling: false,
            spots_left: req.body.matchInfo.groupSize,
            last_invitee_priority_num: 0,
            game_date: req.body.matchInfo.date,
            game_time: req.body.time,
            location: req.body.matchInfo.location,
            info: req.body.matchInfo.note,
            play_type: 'singles'
        }).then(resp =>
            req.body.preConfirmed.map((confirmed, i) => {

                let priority = ++i
                priority = parseInt(priority)

                db.games.invite({ match_id: resp[0].game_id, id: confirmed.friend_id, priority_num: 1, status: req.body.invite.status }).then(
                    priority => {
                        console.log('resp', priority)
                    }
                ).catch(err => {
                    console.log(err)
                })
            },


                req.body.invite.map((friend, i) => {

                    let priority = ++i
                    priority = parseInt(priority)

                    db.games.invite({ match_id: resp[0].game_id, id: friend.friend_id, priority_num: priority, status: req.body.invite.status }).then(
                        invite => {
                            console.log('resp', invite)

                        }
                    ).catch(err => {
                        console.log(err)
                    })
                })
            )

        )
    }

    // let matchId = db.games.create_match({
    //     organizer_id: req.body.matchInfo.coordinatorId,
    //     time_limit: req.body.matchInfo.time,
    //     priority_scheduling: req.body.matchInfo.priority,
    //     spots_left: req.body.matchInfo.groupSize,
    //     last_invitee_priority_num: 0,
    //     game_date: req.body.matchInfo.date,
    //     game_time: req.body.time,
    //     location: req.body.matchInfo.location,
    //     info: req.body.matchInfo.note,
    //     play_type: req.body.matchInfo.playType
    // })

}