const Task = require("./Task")

module.exports = {
    attributes: {
        token: { type: 'string', required: true }, //token użytkownika
        killTime: { type: 'number', required: true }, //wyznaczany na podstawie ostatniego 'logowania', pozwoli z czasem usuwać zadania niekatywnych userów
        tasks: { //zadania przypisane do konkretnej 'sesji użytkownika'
            collection: 'task',
            via: 'userSessionID'
        },
        image: {type: ref}
    },

    loadFile: async function (req, res) {
        //sa
        let token = req.param('token');
        /*let user = await UserSession.find({ where: { token: token } });
        user = user[0];*/
        
        let image = req.param('image');
        UserSession.update({token:token}).set({image:image});

        
    },

    beforeDestroy: function (destroyedRecords, cb) {
        for (let record of destroyedRecords) {
            Task.destroy({ userSessionID: record._id }).exec(cb);
        }
    }
}