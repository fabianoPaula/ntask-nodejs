import jwt from "jwt-simple";

module.exports = app => {
  const cfg = app.libs.config;
  const Users = app.db.models.Users;

  app.post("/token", (req, res) => {
    if ( req.body.email && req.body.password ) {
      const email = req.body.email;
      const password = req.body.passord;

      Users.findOne({ where: { email: email }})
        .then(user => {
          if( Users.isPassword(user.password, password)){
            const payload = { id: user.id };
            const result  = { token: jwt.encode(payload, cfg.jwtSecret) };
            res.json(result)
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    }else{
      res.sendStatus(401);
    }
  });

}