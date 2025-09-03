# WorkZen Frontend

## Overview

WorkZen is a modern, single-page application built with Angular, designed to streamline and enhance productivity for small to medium-sized businesses. This platform provides a centralized hub for managing essential business operations, including:

- **Employee and Department Management:** Organize employee information, manage departmental structures, and facilitate internal communication.

WorkZen is built with the latest Angular features, including standalone components, signals for state management, and a clean, modular architecture. The application is designed to be fast, responsive, and easy to use, with a focus on providing a seamless user experience across all devices.

## Implemented Features

### Core
- Standalone components
- Signal-based state management
- OnPush change detection
- Modern CSS with native control flow
- Routing with lazy loading

### User Authentication
- **AuthService:** Manages user login, registration, and logout functionality.
- **AuthGuard:** Protects routes to ensure only authenticated users can access them.
- **Signin/Signup Components:** Updated to use the `AuthService` for handling user authentication.
- **Sidebar with Logout:** The main sidebar now includes a logout button.

### Design
- Clean and modern UI
- Responsive layout for mobile and web
- Intuitive navigation
- Visually balanced layout with clean spacing
- Polished styles that are easy to understand
- Use of `Iconoir` icon library for a professional look and feel

### Responsiveness
- Collapsible sidebar for mobile devices
- Responsive header and actions on the departments page
- Fluid-width modal for the department form

### Components
- **Dashboard:** Initial dashboard component.
- **Departments:**
  - View a list of departments.
  - Search for departments.
  - Add, edit, and delete departments.
- **Profile:**
  - View user profile information (email and name).
  - Update profile information.
- **Settings:**
  - Manage application settings.
  - Toggle between light and dark themes.
  - Enable or disable email and push notifications.
- **Employees:**
  - View a list of employees
  - Add, edit and delete employees
  - Search for employees

## Current Plan

### Phase 1: Foundational Setup

- [x] Set up the initial Angular project structure.
- [x] Create the core components for the application.
- [x] Implement the main layout and navigation.
- [x] Ensure all components are standalone and use OnPush change detection.

### Phase 2: Iconography Update

- [x] Replace all emojis with icons from the `Iconoir` icon library.
- [x] Update component styles to properly display the new icons.

### Phase 3: Departments Feature

- [x] Implement the full functionality for the Departments component.
- [x] Create a service to manage department data.
- [x] Implement add, edit, and delete functionality.
- [x] Make the departments page responsive.

### Phase 4: User Authentication

- [x] Create `AuthService` for login, registration, and logout.
- [x] Create `AuthGuard` to protect routes.
- [x] Update `signin` and `signup` components.
- [x] Add a logout button to the sidebar.

### Phase 5: Profile Page

- [x] Create the `ProfileComponent`.
- [x] Design the profile page UI.
- [x] Integrate the `AuthService` to display user data.

### Phase 6: Settings Page

- [x] Create the `SettingsComponent`.
- [x] Design the settings page UI.
- [x] Implement theme selection and notification preferences.

### Phase 7: Employees Feature

- [x] Create the `employees` directory.
- [x] Create `employees.service.ts` to manage employee data.
- [x] Create `employees.component.ts` to display the employee list.
- [x] Add a route for `/employees` in `app.routes.ts`.
- [x] Create `employee-form.component.ts` for adding and editing employees.
- [x] Integrate the form with the employee list.
- [x] Ensure the employees page is responsive.

### Phase 8: Profile & Settings

- [x] **Profile Page:**
    - [x] Add the ability to update user profile information.
    - [x] Add a profile picture upload feature.
- [x] **Settings Page:**
    - [x] Implement the theme-switching functionality.
    - [x] Implement the notification settings functionality.

### Phase 9: Dashboard Enhancement (Next)

- [ ] **Dashboard Widgets:**
    - [ ] Create a "Stats" widget to show the total number of employees and departments.
    - [ ] Create a "Recent Activity" widget (mock data).
    - [ ] Create a "Quick Links" widget.
- [ ] **Dashboard Layout:**
    - [ ] Design a responsive grid layout for the dashboard widgets.
- [ ] **Data Integration:**
    - [ ] Connect the "Stats" widget to the `EmployeeService` and `DepartmentService`.
