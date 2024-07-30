export const courseController = (req, res) => {
	const { selectedOption } = req.query;
	fetchCourses(selectedOption)
	  .then((courses) => {
		res.send(courses);
	  })
	  .catch((err) => {
		console.error(err);
		res.status(500).send("An error occurred while fetching cards");
	  });
  };
