pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Clean Workspace') {
            steps {
                cleanWs() // This will clean the Jenkins workspace
            }
        }   
        stage('Build Docker Images') {
            steps {
                script {
                    // Use the correct path relative to the Jenkins workspace
                    sh 'docker-compose -f backend/docker-compose.yml build'
                }
            }
        }
        stage('Start Docker Compose') {
            steps {
                script {
                    // Use the correct path relative to the Jenkins workspace
                    sh 'docker-compose -f backend/docker-compose.yml up -d'
                }
            }
        }
        // You can add more stages for testing or deployment here
    }
}
