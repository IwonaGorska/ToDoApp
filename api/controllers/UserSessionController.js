/**
 * UserSessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment');

module.exports = {
    getByToken: async function (req, res) {
        let token = req.param('u');
        let record = await UserSession.find({ where: { token: token } }).populate('tasks');
        if (!record[0]) {
            //jeśli nie istnieje to musimy go utworzyć i zwrócić pustą tablicę tasków
            let newRecord = await UserSession.create({token: token, killTime: moment().add(1, 'months').toDate().getTime() }).fetch();
            return {data: []}//res.json({data: []});
        }
        else {
            //jeśli istnieje to musimy zupdatować killTime i zwrócić tablicę zadań
            let updatedRecord = await UserSession.update({ where: { token: token } }).set({ killTime: moment().add(1, 'months').toDate().getTime() }).fetch();
            return {data:record[0].tasks}//res.json({data: record[0].tasks})
        }
    }
};

