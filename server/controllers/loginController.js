export const loginController = (req, res) => {
	const { username, password } = req.body;
	login(username, password)
	  .then((profile) => {
		res.send(profile);
	  })
	  .catch((err) => {
		console.error(err);
		res.status(401).send("Invalid username or password");
	  });
  };
