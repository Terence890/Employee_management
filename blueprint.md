
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

### Data Flow
- **HttpClient Integration:** All data services (`EmployeesService`, `DepartmentsService`) now use `HttpClient` to interact with a placeholder backend API (`/api/...`).
- **Reactive Services:** Services fetch data in their constructors and expose data as signals, ensuring components are always up-to-date.
- **CRUD Operations:** Components now use service methods that perform HTTP requests (`POST`, `PUT`, `DELETE`) to manage data.

### User Authentication
- **Futuristic UI with Glassmorphism:** The sign-in and sign-up pages feature a modern, dark theme with a semi-transparent, blurred "glass" effect.
- **Interactive Elements:** Forms include interactive "glow" effects on focused inputs and buttons, providing visual feedback.
- **Integrated Icons:** `Iconoir` icons are embedded within the input fields for a clean and intuitive user experience.
- **Floating Labels:** Form labels animate to a "floating" position above the inputs when focused or filled.
- **Auth Layout:** A dedicated `AuthLayoutComponent` for authentication pages.

### Design
- **Typography:** 
    - Uses the `Exo 2` font from Google Fonts to create a clean, futuristic, and highly readable interface.
    - **Heading Styles:** `h1` tags have a `linear-gradient` text effect, while `h2` and `h3` tags have distinct sizes and weights to create a strong visual hierarchy.
- **Futuristic Aesthetic:** A clean and modern UI that leverages glassmorphism, glowing effects, and a dark theme.
- **Iconography:** Uses the `Iconoir` icon library for a professional and consistent look and feel.
- **Responsive Layout:** Adapts seamlessly to both mobile and web devices.

### Responsiveness
- Collapsible sidebar for mobile devices
- Responsive header and actions on the departments page
- Fluid-width modal for the department form

### Components
- **Dashboard:**
  - Modernized UI with a futuristic glassmorphism design.
  - Light and dark theme support.
  - Real-time stats for employees and departments.
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
- **Reactive Forms:** All forms in the application now use `ReactiveFormsModule` for robust validation and data management.

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

### Phase 4: Foundational Authentication UI

- [x] Create standalone `signin.component.ts` and `signup.component.ts` with reactive forms.
- [x] Design a shared, modern stylesheet (`auth.shared.css`) for a consistent look and feel.
- [x] Implement a dedicated `auth-layout.component.ts` for the authentication flow.
- [x] Configure routes to correctly display sign-in and sign-up pages.
- [x] Ensure form submissions have placeholder logic within the components.

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

### Phase 9: Dashboard Enhancement

- [x] **Dashboard UI:**
    - [x] Implement a futuristic glassmorphism design.
    - [x] Add support for light and dark themes.
    - [x] Create a responsive grid layout.
- [x] **Dashboard Widgets:**
    - [x] Create a "Stats" widget to show the total number of employees and departments.
    - [x] Create a "Recent Activity" widget (mock data).

### Phase 10: Service and Form Refactoring

- [x] **Service Layer:**
    - [x] Refactor `EmployeesService` and `DepartmentsService` to use `HttpClient` for data fetching from a placeholder API.
    - [x] Services now fetch initial data in the constructor.
    - [x] CRUD methods (`add`, `update`, `delete`) now perform HTTP requests and update local signals on success.
- [x] **Component Integration:**
    - [x] Update `EmployeesComponent` and `DepartmentsComponent` to use the refactored service methods.
- [x] **Form Modernization:**
    - [x] Refactor `DepartmentFormComponent` and `EmployeeFormComponent` to use `ReactiveFormsModule`.
- [x] **Data Integration:**
    - [x] Connect the Dashboard's "Stats" widget to the live data from `EmployeeService` and `DepartmentService`.

### Phase 11: Authentication UI Redesign

- [x] **Stylesheet Overhaul:**
    - [x] Redesigned `auth.shared.css` to implement a futuristic, glassmorphism UI.
    - [x] Added interactive "glow" effects for buttons and inputs.
- [x] **Template Updates:**
    - [x] Updated `signin.component.ts` and `signup.component.ts` templates.
    - [x] Integrated `Iconoir` icons directly into the input fields.
    - [x] Implemented a floating label user experience.

### Phase 12: Typography Enhancement

- [x] **Font Implementation:** 
    - [x] Imported the `Exo 2` font from Google Fonts.
    - [x] Set `Exo 2` as the default font for the entire application.
- [x] **Header Styles:** 
    - [x] Applied a `linear-gradient` to `h1` tags for a striking visual effect.
    - [x] Added distinct sizes and weights to `h2` and `h3` tags to create a clear visual hierarchy.
- [x] **Bug Fixes:**
    - [x] Fixed an issue where the `h1` gradient was unreadable in the light theme.

### Phase 13: Final Touches (Next)

- [ ] **Code Refinement:** Review and refactor the codebase for any remaining inconsistencies.
- [ ] **Documentation:** Update comments and documentation.
- [ ] **Final Build:** Perform a final build to ensure everything is in order.
