const Task = require("./Task")

module.exports = {
    attributes: {
        token: { type: 'string', required: true }, //token użytkownika
        killTime: { type: 'number', required: true }, //wyznaczany na podstawie ostatniego 'logowania', pozwoli z czasem usuwać zadania niekatywnych userów
        tasks: { //zadania przypisane do konkretnej 'sesji użytkownika'
            collection: 'task',
            via: 'userSessionID'
        },
        image: { type: 'ref' }
    },

    beforeDestroy: function (destroyedRecords, cb) {
        for (let record of destroyedRecords) {
            Task.destroy({ userSessionID: record._id }).exec(cb);
        }
    }
}