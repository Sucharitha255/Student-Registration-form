const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, ".")));

// Handle form submission
app.post("/submit", (req, res) => {
  console.log("Form Data Received:");
  console.log(req.body);

  res.send("<h2>Form submitted successfully! Check server console for data.</h2>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
