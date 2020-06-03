module.exports = {
    attributes: {
        token: { type: 'string', required: true }, //token użytkownika
        killTime: { type: 'number', required: true }, //wyznaczany na podstawie ostatniego 'logowania', pozwoli z czasem usuwać zadania niekatywnych userów
        tasks: { //zadania przypisane do konkretnej 'sesji użytkownika'
            collection: 'task',
            via: 'userSessionID'
        }
    }
}