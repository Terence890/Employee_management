# WorkZen: Employee Management Dashboard

## Overview

WorkZen is a modern, single-page employee management application built with Angular. It provides a centralized dashboard for HR administrators to manage employees and departments, track key metrics, and streamline HR workflows. The application is designed with a focus on user experience, featuring a clean, responsive interface and a visually appealing dark theme.

## Style, Design, and Features

### Implemented Features:

*   **Dashboard:** A comprehensive overview of key HR metrics, including total employees, active departments, and employee attendance status. It also features a recent activity feed and quick links for common actions.
*   **Employee Management:** A complete CRUD (Create, Read, Update, Delete) interface for managing employee data. Users can view employees in a grid or table format, search for specific employees, and add new employees through a modal form.
*   **Department Management:** A module for managing company departments, allowing users to view, add, and manage department information.
*   **Responsive Design:** The application is fully responsive and adapts to different screen sizes, providing a seamless experience on both desktop and mobile devices.

### Design and Styling:

*   **Dark Theme:** The application uses a sophisticated dark theme with a consistent color palette, typography, and iconography.
*   **Custom Scrollbar:** A custom-styled scrollbar enhances the visual appeal of the application.
*   **Gradient Text:** Eye-catching gradient text is used for page headers to create a strong visual hierarchy.
*   **Interactive Elements:** Buttons and other interactive elements feature subtle hover effects and transitions to provide visual feedback to the user.
*   **Iconography:** The application uses the `iconoir` icon library for a clean and consistent set of icons.

## Current Task: Fix Theme Switching

### Plan:

*   [x] Revert the unnecessary changes made to `dashboard.component.ts` and `dashboard.component.html`.
*   [x] Verify that `dashboard.component.css` correctly uses the global theme classes.
*   [x] Run `ng build` to confirm that everything is working as expected.
