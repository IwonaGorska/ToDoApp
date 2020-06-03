/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment');

module.exports = {
    createTask: async function (req, res) {
        let token = req.param('token');
        let user = await UserSession.find({ where: { token: token } });
        user = user[0];
        let newRecord = await Task.create({
            userSessionID: user.id,
            task: { foo: 'bar' },
            deadlineTime: moment().add(1, 'weeks').toDate().getTime()
        }).fetch();
        return res.ok();
    }

};

