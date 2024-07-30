export const profileController = (req, res) => {
	const { username, password } = req.query;
	fetchProfile(username, password)
	  .then((profile) => {
		res.send(profile);
	  })
	  .catch((err) => {
		console.error(err);
		res.status(500).send("An error occurred while fetching data");
	  });
  };
