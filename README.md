# Todo List — Client

> A full-featured todo list app with directories, priorities, and user authentication.  
> Built with React 19, Redux Toolkit, and Material UI.

## Live Demo

🔗 [your-app.vercel.app](https://your-app.vercel.app) ← بعد از deploy آدرس رو اینجا بذار

## Features

- ✅ User authentication (register, login, forgot password)
- 📁 Custom directories to organize tasks
- ⭐ Mark tasks as important
- 🗓️ Deadline tracking
- 🌙 Dark / Light mode
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 Real-time task search
- 🔢 Sort tasks by date, status, and more

## Tech Stack

- **Framework:** React 19
- **State Management:** Redux Toolkit + EntityAdapter
- **UI Library:** Material UI (MUI) v7
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **Routing:** React Router v7
- **Date Picker:** Day.js + MUI X Date Pickers
- **Build Tool:** Vite

## Local Setup

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

| Variable            | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Backend API URL (e.g. `https://your-server.onrender.com/api`) |

## Deployment (Vercel)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variable:
   - `VITE_API_BASE_URL` → your Render server URL + `/api`
4. Deploy

> **Note:** `vercel.json` is included to handle client-side routing correctly (prevents 404 on page refresh).

## Project Structure

```
src/
├── api/                    # Axios API calls
├── app/                    # Redux store + Router
├── assets/                 # SVG icons
├── components/
│   ├── CardMode/           # Card view components
│   ├── Header/             # Header + Search
│   ├── LIstMode/           # List view components
│   ├── Profile/            # Profile panel + mobile
│   ├── SideBar/            # Sidebar + Directories
│   └── Utils/              # Shared dialogs, TaskButtons
├── features/
│   ├── auth/               # Login, Register, Profile pages + Redux
│   ├── directories/        # Directory management + Redux
│   ├── navigations/        # Navigation state
│   ├── tasks/              # Task pages + Redux
│   └── theme/              # Dark/Light theme
├── shared/
│   ├── hooks/              # useIsMobile
│   └── utils/              # Token storage, error normalization
└── ui/
    └── AppLayout.jsx       # Main layout
```

## Screenshots

> Add screenshots here after deployment

## Author

**[Mohammadreza Mirahmadi]** — [GitHub](https://github.com/mohammadreza-mirahmadi)
