module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route("/tasks")
    .all(app.auth.authenticate())
    .get((req,res) => {
        Tasks.findAll({
          where: { user_id: req.user.id}  
        })
        .then( tasks => res.json(tasks) )
        .catch(error => {
          res.status(412)
            .json({ msg: error.message })
        })
    })
    .post((req,res) => {
      req.body.user_id = req.user.id
      Tasks.create(req.body)
        .then( tasks => res.json(tasks) )
        .catch(error => {
          res.status(412)
            .json({ msg: error.message })
        })
    });

  app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req,res) => {
      Tasks.findOne({ where: {
          id: req.params.id,
          user_id: req.users.id
        } })
        .then(result => {
          if(result){
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412)
            .json({ msg: error.message })
        })
    })
    .put((req,res) => {
      Tasks.findOne(req.body, { where: {
          id: req.params.id,
          user_id: req.users.id
        } })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412)
            .json({ msg: error.message })
        })
    })
    .delete((req,res) => {
      Tasks.destroy(req.body, { where: {
          id: req.params.id,
          user_id: req.users.id
        } })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412)
            .json({ msg: error.message })
        })
    });
}