const mainController = {
    index: (req, res) => {
        res.render('index');
    },
    register: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        res.render('login');
    }
};

module.exports = mainController;