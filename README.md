# Cognizant technical test - Candidate management

This project is a full stack solution developed as part of the technical assessment for Cognizant. It consists of an **Angular** frontend and a **NestJS** backend, orchestrated within an **Nx Monorepo** workspace.

The application allows users to register candidates by combining form data with information extracted from an uploaded Excel file.

## 🚀 Key Features & Requirements met

This solution was built focusing on modern best practices and meeting the specific assessment criteria:

- **Monorepo architecture (Nx):** Used to share code efficiently. A shared library (`libs/shared/interfaces`) ensures that the `Candidate` TypeScript interface is identical for both Frontend and Backend, avoiding duplication and type errors.
- **Backend (NestJS):** \* REST API endpoint to handle `multipart/form-data`.
  - **Excel Processing:** Robust parsing logic that normalizes column names (e.g., handles "Years of experience", "Years", or case sensitivity) to ensure reliability.
  - Returns a combined JSON object as requested.
- **Frontend (Angular 16+):**
  - **Standalone Components:** The application uses the modern Standalone API (no `AppModule`).
  - **Reactive Forms:** Used for input validation and file handling.
  - **Angular Material:** Used for UI components (Input, Table, Button) to reduce custom CSS.
  - **Reactive Programming (Signals):** State management is handled via **Angular Signals** (`candidate.service.ts`) to store and display the list of candidates incrementally without page refreshes.
- **Testing:** Jest is configured for unit testing.

## 🛠 Tech Stack

- **Workspace:** Nx
- **Frontend:** Angular, Angular Material, RxJS.
- **Backend:** NestJS, Multer (File upload), XLSX (Excel parsing).
- **Language:** TypeScript.

## 📂 Project Structure

```text
cognizant-test/
├── apps/
│   ├── backend/         # NestJS API (Controller & service)
│   └── frontend/        # Angular App (Components & Services)
├── libs/
│   └── shared/
│       └── interfaces/  # Shared TypeScript interfaces 
```
