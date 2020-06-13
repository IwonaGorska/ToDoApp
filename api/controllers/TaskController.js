/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment');

module.exports = {

    createTask: async function (req, res) {
        //sa
        let token = req.param('token');
        let user = await UserSession.find({ where: { token: token } });
        user = user[0];
        /*let newRecord = await Task.create({
            title: "Title",
            userSessionID: user.id,
            deadlineTime: moment().add(1, 'weeks').toDate().getTime(), //w przyszlosci chyba pobrane od usera
            priority: 3,
            status: 0,
            finished: false,
            task: { foo: 'bar' }
        }).fetch();*/

        let newRecord = await Task.create({
            title: req.param('title'),
            userSessionID: user.id,
            deadlineTime: moment().add(1, 'weeks').toDate().getTime(), //w przyszlosci chyba pobrane od usera
            priority: req.param('priority'),
            status: 0,
            finished: false,
            task: req.param('content')
        }).fetch();

        return res.ok();
    },

    deleteTask: async function (req, res) {
        //todo
    },

    completeTask: async function (req, res) {
        //todo
    }

};

