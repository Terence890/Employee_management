# Project Blueprint

## Overview

This document outlines the plan for developing a comprehensive employee management application. The application will provide features for managing employees, departments, and tracking employee attendance.

## Implemented Features

*   **Core Application Structure**: Set up a new Angular application with a clean and scalable architecture.
*   **Theme Service**: A service to manage the application's theme (light/dark mode).
*   **Component-Based Architecture**: The application is built using a component-based architecture, with each component having its own dedicated folder containing the component class, template, and styles.
*   **Standalone Components**: All components are standalone, following the latest Angular best practices.
*   **Modern Control Flow**: The application uses the new `@` syntax for control flow in templates.
*   **OnPush Change Detection**: All components use `ChangeDetectionStrategy.OnPush` for better performance.
*   **UI Components**: The application features a variety of UI components, including:
    *   `HeaderComponent`: A header component with a title and theme switcher.
    *   `SidebarComponent`: A sidebar component for navigation.
    *   `DashboardComponent`: A dashboard component to display key metrics and information.
    *   `EmployeesComponent`: A component for listing and managing employees.
    *   `DepartmentsComponent`: A component for listing and managing departments.
    *   `ProfileComponent`: A component for managing the user's profile.
    *   `SettingsComponent`: A component for managing application settings.
*   **Services**: The application uses services to encapsulate business logic and data access:
    *   `ThemeService`: Manages the application's theme.
    *   `EmployeesService`: Provides data for the `EmployeesComponent`.
    *   `AuthService`: Handles user authentication.
*   **Routing**: The application uses the Angular router to navigate between different pages.

## Current Task: Implement Attendance Tracking

I will implement a real-time attendance tracking feature using Firebase Realtime Database. This will allow the application to show which users are currently online.

### Plan:

1.  **Install Firebase**: Add the Firebase SDK to the project.
2.  **Initialize Firebase**: Configure and initialize the Firebase app.
3.  **Create Presence Service**: Create a service to manage user presence status.
4.  **Integrate Presence Service**: Integrate the `PresenceService` into the application to track the current user's status.
5.  **Create Attendance Component**: Create a component to display the attendance status of all users.
6.  **Add Route**: Add a route for the `AttendanceComponent`.
7.  **Update Sidebar**: Add a link to the Attendance page in the sidebar.
