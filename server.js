const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;




app.set("view-engine","ejs")

app.use(express.static("public"));


app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search?query=nature", {
      headers: {
        Authorization: "Bearer EexQqYg6U7r3tdqyZSZnH7DDO6XctBiUned62QlQe2DMqYwLWUxTwNOG",
      },
    });
    const data = response.data.photos;
    res.render("index", { images: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/images/:id", async (req, res) => {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/photos/${req.params.id}`, {
      headers: {
        Authorization: "Bearer EexQqYg6U7r3tdqyZSZnH7DDO6XctBiUned62QlQe2DMqYwLWUxTwNOG",
      },
    });
    const data = response.data;
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
