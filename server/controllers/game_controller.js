
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = process.env

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    getFriendsToInvite: (req, res) => {
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
    getInvite: (req, res) => {
        console.log('getinvite')
        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.games.get_invitees({ game_id: id }).then(
            resp => {
                // console.log(resp)
                res.status(200).send(resp)
            }
        )
    },

    inviteList: (req, res) => {
        console.log('getinviteList')
        let { id } = req.params
        const db = req.app.get('db')
        id = parseInt(id)

        db.games.get_invite_list({ id: id }).then(
            resp => {
                // console.log(resp)
                res.status(200).send(resp)
            }
        )
    },

    invite: async (req, res) => {
        console.log('invite', req.body)
        const db = req.app.get('db')
        let matchInfo = req.body.matchInfo


        await db.games.create_match({
            organizer_id: matchInfo.coordinatorId,
            time_limit: 60,
            priority_scheduling: false,
            spots_left: matchInfo.groupSize,
            last_invitee_priority_num: 0,
            dateTime: matchInfo.dateTime,
            game_date: matchInfo.date,
            game_time: matchInfo.time,
            location: matchInfo.location,
            info: matchInfo.note,
            play_type: matchInfo.play_type,
            game_datetime: matchInfo.dateTime,
            utc_datetime: matchInfo.UTCDateTime
        }).then(resp =>
            req.body.preConfirmed.map((confirmed, i) => {

                let priority = ++i
                priority = parseInt(priority)

                db.games.invite({ match_id: resp[0].game_id, id: confirmed.friend_id, priority_num: 1, status: confirmed.status }).then(
                    priority => {
                        console.log(priority[0], '+1' + priority[0].phone)

                        // if (priority[0].phone.length > 0) {
                        //     let number = '+1' + priority[0].phone
                        //     client.messages
                        //         .create({
                        //             to: number,
                        //             from: +TWILIO_NUMBER,

                        //             body: `Lets Rally!  You have been confirmed to play on ${matchInfo.date} ${matchInfo.time} at ${matchInfo.location} #RallyPlayApp`
                        //         })
                        // }
                    }

                ).catch(err => {
                    console.log(err)
                })
            },


                req.body.invite.map((friend, i) => {
                    console.log('invite', friend)

                    let priority = i += 2
                    priority = parseInt(priority)

                    db.games.invite({ match_id: resp[0].game_id, id: friend.friend_id, priority_num: priority, status: friend.status }).then(
                        invite => {

                        }
                    ).catch(err => {
                    })
                })
            )

        )
    },
    inviteResponse: (req, res) => {
        console.log('inviteResponse', req.body)
        let { gameId, response, userId } = req.body
        const db = req.app.get('db')

        db.games.invite_response({ game_id: gameId, status: response, invitee_id: userId }).then(
            resp => {
                console.log('invite response res', resp)
                res.status(200).send(resp)
            }
        )
    },

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