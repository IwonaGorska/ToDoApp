let $ = require('jquery');
let {v4: uuidv4} = require('uuid')
let userSessionController = require("./UserSessionController");


module.exports = {
    main: async function(req, res){

        // var urlParams = new URLSearchParams(window.location.search);
        // let token = urlParams.get('u');
        let token = req.param('u');
        if (!token) {
            //wygeneruj token 
            token = uuidv4();
        }
        //pobierz dane dla tokena
        let data = await userSessionController.getByToken(req, res);
        return res.view('pages/index',{
            token: token,
            data: data
        })

        // else {
        //     //wsadź token do textfielda
        //     $("#userToken").val(token);
        //     //pobierz listę zadań dla tego tokenu
        //     $.get('/getTasksByToken?token=' + token)
        //         .done((data) => {
        //             //na postawie tej listy wygeneruj pozycje w liście zadań
        //             console.warn("DATA", data)
        //             return res.view("/index2", {
        //                 tasks: data
        //             })
        //         })
        // }
    }
}