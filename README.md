# ChatLogger Dashboard

A modern React frontend for the ChatLogger API, built with TypeScript, Tailwind CSS, and React Router.

## Overview

ChatLogger Dashboard is the frontend interface for the ChatLogger platform, which allows users to store, manage, and analyze chat interactions between users and AI assistants. This repository is part of the larger ChatLogger ecosystem.

![image](https://github.com/user-attachments/assets/690050b2-f009-40af-862a-8538565047a2)

## Features

- User authentication (login/register)
- Dashboard with analytics visualizations
- Chat history management
- Real-time chat logging
- Responsive design with mobile support
- Dark mode support
- Modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- HeroIcons
- Headless UI components

## Project Structure

```plaintext
ChatLogger-Dashboard/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── layouts/       # Layout components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── services/      # API services
│   ├── store/         # State management
│   ├── types/         # TypeScript type definitions
│   └── assets/        # Static assets
├── public/            # Public assets
└── index.html         # Entry HTML file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kjanat/ChatLogger-Dashboard.git
cd ChatLogger-Dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3000/api
```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Related Repositories

- [ChatLogger](https://github.com/kjanat/ChatLogger) - Main repository and documentation
- [ChatLogger-API](https://github.com/kjanat/ChatLogger-API) - Backend API and server-side logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
