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

        let title = req.param('title');
        let deadline = req.param('deadline');
        let priority = req.param('priority');
        let type = req.param('type');
        let content;
        switch(type){
            case '1':{  //proste zadanie
                content = req.param('content')
                break;
            }
            case '2':{  //checklista
                let split = req.param('content').split("\n");
                let checklist = [];
                for(let subtask of split){
                    checklist.push({
                        content: subtask,
                        finished: false
                    })
                }
                content = checklist;
                break;
            }
        }

        let newRecord = await Task.create({
            title: title,
            userSessionID: user.id,
            deadlineTime: new Date(deadline).getTime(),
            type: type,
            priority: priority,
            finished: false,
            task: {
                type: type,
                content: content
            }
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

