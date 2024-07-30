export const transcriptController = (req, res) => {
	const { username, password } = req.query;
	fetchTranscript(username, password)
	  .then((transcript) => {
		res.send(transcript);
	  })
	  .catch((err) => {
		console.error(err);
		res.status(500).send("An error occurred while fetching transcript");
	  });
  };
