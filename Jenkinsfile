/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Get the code from a GitHub repository
                checkout scm
            }
        }
        stage('Generate Certificates') {
            steps {
                sh './create.sh'
            }
        }
        stage('Start Services') {
            steps {
                script {
                    dir('backend') {
                        //start user-ms
                        sh 'docker-compose up -d --build'
                    }
                }
            }
        }
        stage('Frontend test') {
            environment {
                PATH = "/root/.nvm/versions/node/v20.11.0/bin:$PATH"
            }
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm install -g @angular/cli@17'
                        sh 'npm list karma-junit-reporter'
                        sh 'ng test --browsers=ChromeHeadless --watch=false --code-coverage --reporters=junit'
                    }
                }
            }
            post {
                always {
                    junit '**/frontend/test-results.xml'
                }
            }
        }
        stage('Unit Test') {
            steps {
                dir('backend/microservices/user-ms/') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    dir('backend/microservices/user-ms/') {
                        junit 'target/surefire-reports/TEST-*.xml'
                    }
                }
            }
        }
        stage('Stop services') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker-compose down'
                    }
                }
            }
        }
        
    }
    post {
        success {
        // ... other steps ...

            // Use the environment variables to set the subject and body dynamically
            emailext(
            subject: "\$PROJECT_NAME - Build # \$BUILD_NUMBER - SUCCESS",
            body: "Check console output at \$BUILD_URL to view the results.",
            to: 'awiklund76@gmail.com'
        )
        }
        failure {
            // Use the environment variables to set the subject and body dynamically
            emailext(
            subject: "\$PROJECT_NAME - Build # \$BUILD_NUMBER - FAILURE",
            body: "Check console output at \$BUILD_URL to view the results.",
            to: 'awiklund76@gmail.com'
        )
        }
    }
}
