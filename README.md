<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Magic Meme Generator

An AI-powered meme generator using Google Gemini to create and edit memes with natural language.

View your app in AI Studio: https://ai.studio/apps/drive/1kEG63oGi5CtuxIW8D_891svQ5vSs1N9k

## Features

- 🎨 AI-powered meme generation using Google Gemini
- 🖼️ Upload your own images or use sample memes
- ✏️ Edit memes with natural language commands
- 📥 Download your creations
- 🎯 Built with React, TypeScript, and Vite

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Development

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

### Testing

- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Open Vitest UI for interactive testing

### Code Quality

- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Project Structure

```
.
├── components/         # React components
├── hooks/             # Custom React hooks
├── services/          # API services (Gemini integration)
├── utils/             # Utility functions
├── test/              # Test files
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── types.ts           # TypeScript type definitions
└── vite.config.ts     # Vite configuration
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Google Gemini** - AI capabilities
- **Vitest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Development Environment

This project is configured with:

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for consistent formatting
- **Vitest** for unit testing
- **Vite** for fast builds and HMR

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run test:run && npm run lint`)
5. Format your code (`npm run format`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is private and for demonstration purposes.

## Support

For issues or questions, please open an issue on the GitHub repository.
