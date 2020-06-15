module.exports = {
    attributes: {
        title: { type: 'string', required: true },
        userSessionID: { model: 'userSession' },  //identyfikator sesji użytkownika
        deadlineTime: { type: 'number', required: true },    //czas na ukończenie
        priority: { type: 'number', defaultsTo: 5 }, //priorytet
        status: { type: 'number', defaultsTo: 0 },  //status
        finished: { type: 'boolean', defaultsTo: false },  //czy ukończone?
        task: { type: 'json', required: true }  //faktyczne zadanie - czemu nie string po prostu?
    }
} 