pipeline {
    agent any

    environment {
        APP_NAME = 'skillpath-ai'
        STAGING_CONTAINER = 'skillpath-ai-staging'
        PROD_CONTAINER = 'skillpath-ai-prod'
        PROM_CONTAINER = 'skillpath-prometheus'
        STAGING_PORT = '3000'
        PROD_PORT = '3001'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies and building Docker image artefact...'
                bat 'node -v'
                bat 'npm -v'
                bat 'npm install'
                bat 'docker build -t %APP_NAME%:%BUILD_NUMBER% -t %APP_NAME%:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated Jest and Supertest unit/API tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint code quality checks...'
                bat 'npm run lint'
            }
        }

        stage('Security') {
            steps {
                echo 'Running dependency security scan with npm audit...'
                bat 'npm audit --audit-level=high'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to staging Docker container...'
                bat 'docker rm -f %STAGING_CONTAINER% 2>NUL || exit /b 0'
                bat 'docker run -d --name %STAGING_CONTAINER% -p %STAGING_PORT%:3000 -e NODE_ENV=staging %APP_NAME%:%BUILD_NUMBER%'
                bat 'powershell -Command "Start-Sleep -Seconds 5"'
                bat 'curl -f http://localhost:%STAGING_PORT%/health'
            }
        }

        stage('Release') {
            steps {
                echo 'Promoting the validated build to a production-like container...'
                bat 'docker tag %APP_NAME%:%BUILD_NUMBER% %APP_NAME%:prod-%BUILD_NUMBER%'
                bat 'docker rm -f %PROD_CONTAINER% 2>NUL || exit /b 0'
                bat 'docker run -d --name %PROD_CONTAINER% -p %PROD_PORT%:3000 -e NODE_ENV=production %APP_NAME%:prod-%BUILD_NUMBER%'
                bat 'powershell -Command "Start-Sleep -Seconds 5"'
                bat 'curl -f http://localhost:%PROD_PORT%/health'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking production health and exposing Prometheus monitoring metrics...'
                bat 'curl -f http://localhost:%PROD_PORT%/health'
                bat 'curl -f http://localhost:%PROD_PORT%/metrics'
                bat 'docker rm -f %PROM_CONTAINER% 2>NUL || exit /b 0'
                bat 'docker run -d --name %PROM_CONTAINER% -p 9090:9090 -v "%WORKSPACE%/prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus:latest'
                bat 'powershell -Command "Start-Sleep -Seconds 8"'
                bat 'curl -f http://localhost:9090/-/ready'
                echo 'Monitoring available at http://localhost:9090 and app health at http://localhost:3001/health'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Useful commands: docker ps, docker logs skillpath-ai-prod'
        }
        success {
            echo 'SkillPath AI pipeline completed successfully through all 7 stages.'
        }
        failure {
            echo 'Pipeline failed. Check the failed stage console output and fix before recording the final demo.'
        }
    }
}
