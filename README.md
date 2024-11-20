# Time Management Tool 🚀

## Project Origin

This project was inspired by a personal journey shared in [this tweet](https://x.com/NikhilEth/status/1846957571761983971) about creating a time management solution based on productivity techniques.

## Overview

A comprehensive web application designed to help you manage time, prioritize tasks, and boost productivity. Built with modern web technologies and inspired by advanced time management techniques.

## Features

- Task prioritization (Urgent, Important, Time-taken)
- Custom Pomodoro Timer 🍅
- To-do lists
- Performance analytics
- Google Account Login
- Cross-device synchronization

## Prerequisites

- Node.js (v16 or later)
- npm
- Docker (optional, for local database)
- PostgreSQL

## Setup Instructions

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

### 6. Start the Application

```bash
npm run dev
```

Access the application at: `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/AthenaFoss/time_managment_tool](https://github.com/AthenaFoss/time_managment_tool)
