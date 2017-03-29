var User = require('../models/User');
/**
 * get all the users
 */
exports.getUsers = (function (req, res) {
    User.find((err, users) => {
        console.log(users);

        if (err)
            res.send(err);

        res.json(users)
    });
});

/**
 * get a single user
 */
exports.getUser = (function (req, res) {
    FitUser.findById(req.params.fituser_id, function (err, fituser) {
        if (err)
            res.send(err);
        res.json(fituser)
    });
});

/**
 * update the user with this id
 */
exports.updateUser = (function (req, res) {
    FitUser.findById(req.params.fituser_id, function (err, fituser) {
        if (err)
            res.send(err);
        fituser.name = req.body.name; //update the user with the info in the request body

        fituser.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'User updated!' });
        });
    });
});

/**
 *  delete a user with its id
 */
exports.deleteUser = (function (req, res) {
    FitUser.remove({
        _id: req.params.fituser_id
    }, function (err, fituser) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfullly deleted the user' });
    });
});