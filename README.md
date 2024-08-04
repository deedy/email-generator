# Email Generator

## Overview

Email Generator is a web application that helps users create personalized emails based on a company's website content and the user's LinkedIn profile. It uses AI to generate contextually relevant emails for various purposes such as job applications, networking, or business proposals.

## Features

- Scrapes content from a given company website to provide context
- Uses the LinkedIn URL to personalize the email (without scraping LinkedIn directly)
- Supports multiple reasons for reaching out (hiring, funding, selling)
- Generates a well-structured, personalized email using AI

## Tech Stack

- Frontend: React.js with custom CSS
- Backend: Node.js with Express
- Web Scraping: Cheerio
- AI Integration: Anthropic's Claude API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- An Anthropic API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/email-generator.git
   cd email-generator
   ```

2. Install the dependencies for both frontend and backend:
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

## Usage

1. Start the backend server:
   ```
   node server.js
   ```

2. In a new terminal, start the React frontend:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

4. Enter the required information:
   - LinkedIn profile URL
   - Company website URL
   - Reason for reaching out

5. Click "Generate Email" and wait for the AI to create your personalized email

## Contributing

Contributions to the Email Generator project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/email-generator](https://github.com/yourusername/email-generator)

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Cheerio](https://cheerio.js.org/)
- [Anthropic](https://www.anthropic.com/)# email-generator
