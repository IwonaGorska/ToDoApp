/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment');

module.exports = {
    openForm: async function () {
        document.getElementById("newTaskForm").style.display = "block";
    },

    closeForm: async function () {
        document.getElementById("newTaskForm").style.display = "none";
    },

    createTask: async function (req, res) {
        let token = req.param('token');
        let user = await UserSession.find({ where: { token: token } });
        user = user[0];
        let newRecord = await Task.create({
            userSessionID: user.id,
            deadlineTime: moment().add(1, 'weeks').toDate().getTime(), //w przyszlosci chyba pobrane od usera
            priority: 3,
            status: 0,
            finished: false,
            task: { foo: 'bar' }
        }).fetch();
        return res.ok();
    }

};

