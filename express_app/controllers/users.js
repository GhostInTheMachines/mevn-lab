module.exports.controller = (app) => {
    // get users page
    app.get('/users', (req, res) => {
        res.render('users', { title: 'My Cool Users', description: 'This is my awesome description of the users'});
    })
}