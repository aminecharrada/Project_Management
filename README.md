# Project Management Platform (Frontend - Angular)

This is the Angular-based frontend for the Enova Robotics Project Management Platform. It provides a rich, interactive user interface for managing projects, organizational poles (teams/departments), tasks, personnel, and visualizing key performance indicators (KPIs) and project progress.

## Visual Tour & Key Features

Our platform offers a comprehensive suite of tools to streamline project workflows:

### 1. Project Dashboard
Gain an at-a-glance overview of all active projects. Each project card displays its title, description, progress (via `ngx-circle-progress`), status (e.g., "% EN RETARD"), key dates, and the responsible person with their avatar. An "Add Project" button (using Angular Material Dialog) allows for quick project creation.

![image](https://github.com/user-attachments/assets/06cd8f49-5bec-4811-9440-efbb21188ece)
*Caption: Main dashboard displaying project cards with progress, status, and responsible personnel.*

### 2. Pole Management Dashboard
Organize and monitor progress at the "Pole" (team/department) level. Similar to projects, each pole is displayed as a card showing its name, overall progress, and the responsible lead. New poles can be added via an Angular Material Dialog.

![image](https://github.com/user-attachments/assets/dbd8d8a9-9ebc-4479-93f3-bf8625cc2974)
*Caption: Dashboard for managing and tracking the progress of different "Poles" or teams.*

### 3. Interactive Task Management with Gantt Chart
Visualize and manage tasks effectively using a powerful DHTMLX-Gantt chart. This view displays tasks in a hierarchical list alongside a timeline, showing assigned resources, associated pole, start/finish dates, duration (in days and hours), and real-time progress. Overdue tasks are clearly highlighted. Tasks can be created, updated, and linked directly within the Gantt interface.

![image](https://github.com/user-attachments/assets/69b05800-6026-4747-97d7-93de032ab7bd)
*Caption: Detailed Task Management interface featuring an interactive DHTMLX-Gantt chart for scheduling and progress tracking.*

### 4. In-Depth Project Analytics & KPIs
Monitor project health with a dedicated KPI dashboard. This section utilizes various charts (powered by Chart.js via `ng2-charts` and custom components with NG-ZORRO Ant Design cards) to display:
*   Overall advancement ("Taux d'avancement")
*   Schedule deviations ("Ecart délais")
*   Activity status (e.g., completed vs. non-completed tasks)
*   Progression trends and other relevant metrics.

![image](https://github.com/user-attachments/assets/d5d2e56d-14cf-4e0b-991e-8ed56c3a26e5)
*Caption: Comprehensive analytics dashboard for a project, showcasing various KPIs and performance charts.*

### 5. People & Resource Management
Efficiently manage team members using an Angular Material Table. View personnel details including their photo, name, role, and assigned pole. Add new members using a dedicated Angular Material Dialog. You can also view tasks assigned to a specific person.

![image](https://github.com/user-attachments/assets/2db14bdd-45bf-4cf0-9e4c-438c71ab9bee)
*Caption: Interface for listing and managing team members, their roles, and pole assignments.*

![image](https://github.com/user-attachments/assets/8574f5c6-02ec-4a57-8642-4ad28339783f)
*Caption: Angular Material Dialog for adding new team members to the system.*

## Core Technologies

*   **Framework:** Angular (v12+ likely, based on component structure)
*   **UI Component Libraries:**
    *   Angular Material: Extensively used for dialogs, forms, tables, buttons, toolbar, cards, icons, progress bars, etc.
    *   NG-ZORRO-Ant Design: Used for layout components (`nz-layout`, `nz-card`, `nz-row`, `nz-col`) and some UI elements.
*   **Charting & Visualization:**
    *   `ngx-circle-progress`: For circular progress indicators on dashboards.
    *   `ng2-charts` (Chart.js wrapper): For bar charts, line charts in the KPI section.
*   **Gantt Chart:** `dhtmlx-gantt`: For the interactive task scheduling and Gantt chart functionality.
*   **State Management:** Implied local component state and service-based data management. RxJS is used extensively for asynchronous operations.
*   **HTTP Client:** Angular `HttpClient` for communication with the backend API.
*   **Routing:** Angular Router for navigation.
*   **Forms:** Angular Reactive Forms (`FormGroup`, `FormControl`) for data input and validation.
*   **Styling:** SCSS.
*   **Language:** TypeScript.
*   **Build Tool:** Angular CLI.

## Backend API

This frontend application consumes a backend API, typically running at `http://localhost:8080/api`. Service URLs are configured within the Angular services (e.g., `PoleService`, `ProjectService`, `TaskService`, `PersonneService`).

*(Note: For production, it's recommended to configure the API base URL via Angular's environment files (`environment.ts`, `environment.prod.ts`)).*

## Prerequisites

*   Node.js (LTS version, e.g., v16.x, v18.x recommended)
*   npm (v7+) or yarn
*   Angular CLI installed globally: `npm install -g @angular/cli`
*   A running instance of the [Project Management Backend API](https://github.com/aminecharrada/Project_Management_Backend.git) (ensure it's accessible at `http://localhost:8080`).

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aminecharrada/Project_Management.git
    cd Project_Management
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Verify Backend API URL:**
    The backend API URL is currently hardcoded in the service files (e.g., `src/app/services/pole.service.ts`). Ensure your backend is running at `http://localhost:8080`. If it's different, you'll need to update these service files accordingly or refactor to use environment variables.

## Running the Application

*   **Development Server:**
    ```bash
    ng serve -o
    ```
    This will compile the application and open it in your default browser, typically at `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

*   **Build for Production:**
    ```bash
    ng build --configuration production
    ```
    The build artifacts will be stored in the `dist/` directory.




---
