// module.exports.controller = (app) => {
//     // get users page
//     app.get('/users', (req, res) => {
//         res.render('index', { title: 'My Cool Users'});
//     })
// }

const User = require("../models/User");

module.exports.controller = (app) => {
    // get all users
    app.get('/users', (req, res) => {
        User.find({}, 'name email', function (error, users) {
            if (error) {console.log(error); }
            res.send(users);
        })
    })
}