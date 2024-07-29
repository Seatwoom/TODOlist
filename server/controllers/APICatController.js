const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const { CAT_API_URL } = require("../../client/src/config");

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      `${CAT_API_URL}/images/search?limit=6&has_breeds=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cats from external API");
    }
    const cats = await response.json();
    res.json(cats);
  } catch (error) {
    console.error("Error fetching cats from external API:", error);
    res.status(500).json({ error: "Failed to fetch cats from external API" });
  }
});

module.exports = router;
