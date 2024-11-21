# Time Management Tool 


## Project Origin

This project was inspired by a personal journey shared in the tweet: [View Original Tweet](https://x.com/NikhilEth/status/1846957571761983971)

The idea emerged from a desire to create a comprehensive time management tool that goes beyond traditional tracking methods, focusing on productivity and personal growth.

![Time Management App Preview](https://pbs.twimg.com/media/GaG2H34WcAAgcee?format=jpg&name=large)

## Overview

A comprehensive web application designed to help you manage time, prioritize tasks, and boost productivity. Built with modern web technologies and inspired by advanced time management techniques.


## Key Features

### Productivity Arsenal 💪🎯
- 🔥 Smart Task Prioritization (Urgent, Important, Time-taken)
- 🍅 Customizable Pomodoro Timer
- 📋 Intelligent To-do Lists
- 📊 Performance Analytics Dashboard

### PWA Superpowers 🌐📱
- 🚫 Offline Mode Support
- 💻 Desktop & Mobile Installation
- 🔔 Smart Push Notifications
- 🔄 Background Synchronization
- 🏠 Home Screen Shortcut

## Tech Stack

- Frontend: Next.js
- Backend: Node.js
- Database: PostgreSQL
- ORM: Prisma
- Authentication: Google OAuth
- Deployment: TBD

## Prerequisites

- Node.js (v16 or later)
- npm
- Docker (optional, for local database)
- PostgreSQL

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/{your_github_username}/time_managment_tool.git
cd time_managment_tool
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```
NODE_ENV=development
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/time_management
```

### 4. Database Setup

#### Option 1: Local PostgreSQL with Docker

```bash
docker-compose up -d
```

#### Option 2: Cloud Database

Configure your `DATABASE_URL` with your cloud provider's PostgreSQL connection string.

### 5. Generate Prisma Client

```bash
npm run db:generate
```

### 6. Run Database Migrations

```bash
npm run db:migrate
```

### 7. Start the Application

```bash
npm run dev
```

Access the application at: `http://localhost:3000`

## Troubleshooting

- Ensure all environment variables are correctly set
- Check PostgreSQL connection
- Verify Node.js and npm versions
- Run `npm audit` to check for dependency vulnerabilities

## Security Considerations

- Keep dependencies updated
- Use environment-specific configurations
- Implement proper authentication and authorization
- Use HTTPS for all production deployments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Ensure CI/CD checks pass

## Testing

```bash
npm run test
```

## Build for Production

```bash
npm run build
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- Inspired by Nikhil PN's personal productivity journey
- Time management techniques from productivity experts

## Contact

Project Link: [https://github.com/AthenaFoss/time_managment_tool](https://github.com/AthenaFoss/time_managment_tool)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/AthenaFoss/time_managment_tool/issues) on GitHub.
