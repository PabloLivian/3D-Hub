# 3D Hub - The Job Board for the 3D Industry

![3D Hub Logo](/public/logo.svg)

**3D Hub** is a specialized job board connecting talented 3D artists, animators, and VFX specialists with top studios worldwide. Built with modern web technologies, it offers a seamless and responsive experience for job seekers to discover their next career opportunity.

## 🚀 Product Features

-   **Smart Filtering**: Filter jobs by Specialty (VFX, Animation, Games), Experience Level, and Contract Type.
-   **Dynamic Search**: Real-time search by job title, studio, or keywords.
-   **Company Profiles**: Browse detailed profiles of top studios (DNEG, Industrial Light & Magic, Ubisoft, etc.) to see all their open positions.
-   **Job Details**: deeply integrated details view with full job descriptions and direct application links.
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
-   **Modern UI**: A clean, "glassmorphism" inspired aesthetic with smooth interactions.

## 🛠️ Tech Stack

This project is built with a focus on performance, scalability, and code quality:

-   **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (SWC compiler).
-   **Routing**: React Router v7 with Lazy Loading & Suspense.
-   **Styling**: Native CSS Modules for component-scoped styles + Standard CSS variables.
-   **Icons**: Google Material Symbols.
-   **Fonts**: Inter & Noto Sans (via Google Fonts).
-   **Data**: JSON-based mock database for rapid prototyping.

## 📦 Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PabloLivian/3D-Hub.git
    cd 3DHub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (JobCard, Navbar, etc.)
├── pages/        # Main application views (Home, Jobs, Companies)
├── hooks/        # Custom React hooks
├── data/         # Mock data (jobs3D.json)
├── styles/       # Global styles and variables
└── main.jsx      # Entry point
```

## 📄 License
This project is for educational and portfolio purposes. All job listings and company logos are property of their respective owners.
