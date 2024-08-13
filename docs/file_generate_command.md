#!/bin/bash

# Define the file name
FILE_NAME="nestjs-cli-commands.md"

# Write the content to the file
cat <<EOL > $FILE_NAME
# NestJS CLI Commands

## 1. Create a New Project
\`\`\`bash
nest new project-name
\`\`\`

## 2. Generate a Module
\`\`\`bash
nest g module module-name
\`\`\`

## 3. Generate a Controller
\`\`\`bash
nest g controller controller-name
\`\`\`

### Generate a Controller within a Module
\`\`\`bash
nest g controller module-name/controller-name
\`\`\`

## 4. Generate a Service
\`\`\`bash
nest g service service-name
\`\`\`

### Generate a Service within a Module
\`\`\`bash
nest g service module-name/service-name
\`\`\`

## 5. Generate a Resource (Module, Controller, and Service)
\`\`\`bash
nest g resource resource-name
\`\`\`

### Resource without Spec Files
\`\`\`bash
nest g resource resource-name --no-spec
\`\`\`

### Resource with CRUD API Methods
\`\`\`bash
nest g resource resource-name --crud
\`\`\`

## 6. Generate a Guard
\`\`\`bash
nest g guard guard-name
\`\`\`

## 7. Generate an Interceptor
\`\`\`bash
nest g interceptor interceptor-name
\`\`\`

## 8. Generate a Middleware
\`\`\`bash
nest g middleware middleware-name
\`\`\`

## 9. Generate a Pipe
\`\`\`bash
nest g pipe pipe-name
\`\`\`

## 10. Generate a Filter
\`\`\`bash
nest g filter filter-name
\`\`\`

## 11. Generate a Gateway (for WebSocket)
\`\`\`bash
nest g gateway gateway-name
\`\`\`

## 12. Generate a Decorator
\`\`\`bash
nest g decorator decorator-name
\`\`\`

## 13. Generate an Exception
\`\`\`bash
nest g exception exception-name
\`\`\`

## 14. Generate a Class
\`\`\`bash
nest g class class-name
\`\`\`

## 15. Generate an Interface
\`\`\`bash
nest g interface interface-name
\`\`\`

## 16. Generate an Enum
\`\`\`bash
nest g enum enum-name
\`\`\`

## 17. Generate a Resolver (for GraphQL)
\`\`\`bash
nest g resolver resolver-name
\`\`\`

## 18. Running the Application
\`\`\`bash
npm run start
\`\`\`

## 19. Running the Application in Watch Mode
\`\`\`bash
npm run start:dev
\`\`\`

## 20. Running the Application in Production Mode
\`\`\`bash
npm run start:prod
\`\`\`

## 21. Running Tests
\`\`\`bash
npm run test
\`\`\`

### Running Tests in Watch Mode
\`\`\`bash
npm run test:watch
\`\`\`
EOL

# Confirm file creation
echo "Markdown file '$FILE_NAME' created successfully."
