const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

// API endpoint for scraping Amazon product details
app.get('/api/scrape', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('#productTitle').text().trim();
    const price = $('#priceblock_ourprice').text().trim();
    const image = $('#landingImage').attr('src');

    res.json({ title, price, image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the page' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
