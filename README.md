Here’s the `README.md` content in Markdown format, ready to be copied into your project:

# Basic Auth Frontend (Basic_Auth_FE)

This is an Angular-based frontend application for a basic authentication system. It provides user login, signup, and a protected home page with logout functionality. The app uses Angular Material for UI components, JWT-based authentication, and integrates with a backend API (assumed to be an ASP.NET Core service).

## Features
- **Login**: Email/password authentication with form validation and error handling.
- **Signup**: User registration with name, email, and password fields.
- **Home Page**: Protected route displaying a welcome message and a profile menu with logout option.
- **Routing Guards**: 
  - `authGuard`: Protects routes for authenticated users only.
  - `loggedInGuard`: Prevents authenticated users from accessing login/signup pages.
- **JWT Interceptor**: Automatically attaches JWT tokens to HTTP requests.
- **Animations**: Card entrance animations for login/signup pages.
- **Toast Notifications**: Error messages displayed via Angular Material SnackBar.
- **Responsive Design**: Built with Angular Material for a modern, mobile-friendly UI.

## Prerequisites
- **Node.js**: v22.14.0 or compatible
- **npm**: v11.1.0 or compatible
- **Angular CLI**: v19.2.0
- **Backend API**: An ASP.NET Core backend running at `https://localhost:7237` (or adjust the `apiUrl` in `AuthService`).

## Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Basic_Auth_FE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
- Ensure your backend API is running (e.g., at `https://localhost:7237`).
- Update `src/app/services/auth.service.ts` if your backend URL differs:
  ```typescript
  private apiUrl = 'https://localhost:7237'; // Adjust as needed
  ```

### 4. Run the Application
```bash
ng serve
```
- Open your browser at `http://localhost:4200`.

## Project Structure
```
Basic_Auth_FE/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── logged-in.guard.ts
│   │   │   └── services/
│   │   │       └── auth.service.ts
│   │   ├── core/
│   │   │   └── jwt.interceptor.ts
│   │   ├── home/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── styles.scss
│   └── main.ts
├── angular.json
├── package.json
└── README.md
```

## Usage
1. **Login**:
   - Navigate to `/login`.
   - Enter email and password.
   - On success, redirected to `/home`.
   - On error, see a toast notification.

2. **Signup**:
   - Navigate to `/signup`.
   - Enter name, email, and password.
   - On success, redirected to `/home`.
   - On error, see a toast notification.

3. **Home**:
   - Accessible at `/home` (protected route).
   - Features a toolbar with a profile menu (Profile, Logout).
   - Logout clears the JWT token and redirects to `/login`.

4. **Routing**:
   - `/`: Redirects to `/home` (or `/login` if unauthenticated).
   - `/login`: Login page (blocked for logged-in users).
   - `/signup`: Signup page (blocked for logged-in users).
   - `/home`: Protected home page.
   - `/**`: Redirects to `/login`.

## Backend Integration
- **API Endpoints**:
  - `POST /login`: Authenticates users and returns `{ "accessToken": "..." }`.
  - `POST /api/users`: Registers users and returns `{ "accessToken": "..." }`.
- **CORS**: Backend must allow `http://localhost:4200` (configured in backend `Program.cs`).

## Development

### Build
```bash
ng build
```

### Run with Production Mode
```bash
ng serve --configuration production
```

### Troubleshooting
- **CORS Errors**: Ensure backend allows `http://localhost:4200`.
- **Token Issues**: Verify backend returns `accessToken` in responses.
- **Routing Problems**: Check console (F12) for errors and ensure `<router-outlet>` is in `app.component.html`.

## Dependencies
- **Angular**: v19.2.0
- **Angular Material**: v19.2.1
- **RxJS**: v7.8.2
- **TypeScript**: v5.7.3
- Full list in `package.json`.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License
This project is unlicensed—feel free to use and modify it as needed.
```

---

### How to Use
1. Create a file named `README.md` in your `Basic_Auth_FE` directory.
2. Copy the above content into it using a text editor (e.g., VS Code).
3. Replace `<repository-url>` with your actual Git repository URL if you have one.
4. Save the file.

This Markdown file provides a clear overview of your project, setup instructions, and usage details. Let me know if you’d like to add more sections (e.g., screenshots, deployment steps) or tweak anything!