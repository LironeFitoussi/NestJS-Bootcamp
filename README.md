# NestJS Bootcamp

This repository contains the code and resources for a comprehensive NestJS Bootcamp, organized into different sections covering various aspects of NestJS development.

## 🚀 Repository Structure

The bootcamp is organized into the following sections, each containing practical projects:

### Section 2: Core Concepts
- **scratch/** - Basic NestJS setup and core concepts
  - Basic controller and service implementation
  - Module organization

### Section 3-5: Advanced Topics
- **messages/** - Messaging system implementation
  - Message handling and routing
  - Basic service communication

### Section 6: Dependency Injection
- **di/** - Computer System with DI
  - `/src/computer` - Computer controller and module
  - `/src/cpu` - CPU component implementation
  - `/src/disk` - Disk storage implementation
  - `/src/power` - Power management system
  - Demonstrates NestJS dependency injection patterns

### Section 7: Car Management System
- **cars/** - Complete car management application
  - `/src/auth` - Authentication system
    - DTOs for request validation
    - Auth controller and service
    - Repository pattern implementation
  - `/src/reports` - Reporting functionality
  - `/src/types` - TypeScript interfaces and types
  - Full authentication and authorization

### Section 8: CV Reports System
- **cvreports/** - CV reporting application
  - `/src/auth` - Authentication system
  - `/src/reports` - CV report generation
  - `/src/types` - Type definitions
  - Enhanced reporting features

### Sections 9-13: CV Management System
Progressive development of a complete CV management system:

#### Section 9: Basic Implementation
- **mycv/** - Initial CV system
  - `/src/users` - User management
  - `/src/reports` - Basic reporting
  - Core functionality implementation

#### Section 10: Authentication
- **mycv/** - Added security features
  - Enhanced user authentication
  - Role-based access control
  - Security middleware

#### Section 11: Performance
- **mycv/** - Performance optimizations
  - Caching implementation
  - Query optimization
  - Response compression

#### Section 12: Deployment
- **mycv/** - Deployment configuration
  - Environment configuration
  - Production settings
  - Deployment scripts

#### Section 13: Complete System
- **mycv/** - Final implementation
  - All features integrated
  - Production-ready code
  - Best practices implemented

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:
```bash
cd nestjs-bootcamp
```

3. Install dependencies for each project:
```bash
cd [section-folder]/[project-folder]
npm install
```

## 🏗️ Project Structure

Each project follows NestJS best practices with:
- Modular architecture
- Dependency injection
- TypeScript interfaces and DTOs
- Unit and e2e tests
- Environment configuration

### Key Features by Section

1. **Section 2**: Basic NestJS concepts
   - Controllers and services
   - Module organization
   - Basic routing

2. **Sections 3-5**: Advanced concepts
   - Message handling
   - Service communication
   - Basic patterns

3. **Section 6**: Dependency Injection
   - Component-based architecture
   - Service injection
   - Module organization

4. **Section 7**: Car Management
   - Authentication system
   - Reporting features
   - Type safety

5. **Section 8**: CV Reports
   - Enhanced authentication
   - Report generation
   - Type definitions

6. **Sections 9-13**: CV System
   - Progressive feature addition
   - Security implementation
   - Performance optimization
   - Deployment configuration
   - Production readiness

## 📚 Learning Path

1. Start with Section 2 to understand basic NestJS concepts
2. Progress through Sections 3-5 to learn advanced patterns
3. Study Dependency Injection in Section 6
4. Build the Car Management System in Section 7
5. Create the CV Reports System in Section 8
6. Progress through Sections 9-13 to build a complete CV Management System

## 🔧 Environment Setup

Each project requires specific environment variables. Create a `.env` file in each project's root directory and configure:
- Database connections
- Authentication secrets
- API keys
- Environment-specific settings

Check each project's README.md for specific setup instructions.

## 🤝 Contributing

Feel free to contribute to this repository by:
1. Forking the repository
2. Creating a new branch
3. Making your changes
4. Submitting a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NestJS Team for the amazing framework
- All contributors who have helped improve this bootcamp

---

Happy coding! 🚀 