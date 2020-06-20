/**
 * UserSessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment');

module.exports = {

    loadFile: async function (req, res) {
        //sa
        let token = req.param('token');
        /*let user = await UserSession.find({ where: { token: token } });
        user = user[0];*/
        
        let image = req.param('image');
        let us = await UserSession.update({token:token}).set({image:image}).fetch();
        console.log("test ", us[0].image);
        
        return res.ok();
    },

    getByToken: async function (req, res) {
        let token = req.param('u');
        let record = await UserSession.find({ where: { token: token } }).populate('tasks');
        if (!record[0]) {
            //jeśli nie istnieje to musimy go utworzyć i zwrócić pustą tablicę tasków
            let newRecord = await UserSession.create({ token: token, killTime: moment().add(1, 'months').toDate().getTime() }).fetch();
            return { data: [], image: null }
        }
        else {
            //jeśli istnieje to musimy zupdatować killTime i zwrócić tablicę zadań
            let updatedRecord = await UserSession.update({ where: { token: token } }).set({ killTime: moment().add(1, 'months').toDate().getTime() }).fetch();
            let tmp = [...record[0].tasks];
            tmp.sort((a, b) => b.priority - a.priority)
            return { data: tmp, image: record[0].image }
        }
    }
};

