const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Remove script and style elements
    $('script, style').remove();
    
    // Get the text content
    let text = $('body').text();
    
    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    // Extract meta description
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    // Extract main headings
    const headings = $('h1, h2').map((_, el) => $(el).text().trim()).get().join('. ');
    
    // Combine and limit to first 1000 characters
    const combinedText = `${metaDescription} ${headings} ${text}`;
    console.log(combinedText.substring(0, 1000))
    return combinedText.substring(0, 1000);
  } catch (error) {
    console.error('Error scraping website:', error);
    return null;
  }
}

app.post('/generate-email', async (req, res) => {
  const { linkedinUrl, companyUrl, reason } = req.body;

  try {
    const linkedinContent = await scrapeWebsite(linkedinUrl);
    const websiteContent = await scrapeWebsite(companyUrl);

    const prompt = `Generate a personalized email for a person with the following details:

LinkedIn of who I'm reaching out to:
${linkedinContent}

Company website I'm reaching out about:
${websiteContent}

Reason for reaching out: ${reason}

The email should be professional, concise, and tailored to the specific reason for reaching out. Use the company website content to show familiarity with the company and its offerings. The LinkedIn profile is provided for context, but do not assume you have specific details from it. Instead, write the email as if you've quickly glanced at their LinkedIn profile.

Please structure the email with:
1. A personalized greeting
2. A brief introduction explaining why you're reaching out
3. A paragraph showing your understanding of their company based on the website content
4. A clear call to action or next steps
5. A professional closing

Please do not use any "[]" and infer those details from my prompt. Infer the company name from Company Website Content. Sign off with "Deedy, Menlo Ventures". 

Ensure the tone matches the reason for reaching out (e.g., more formal for job applications, friendly but professional for networking). `;

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });

    res.json({ email: response.data.content[0].text });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));