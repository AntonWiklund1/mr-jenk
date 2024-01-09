pipeline {
    agent any

    stages {
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
        stage('start docker-compose') {
            steps {
                script {
                    // Use the correct path relative to the Jenkins workspace
                    sh 'docker-compose -f backend/docker-compose.yml up -d'
                }
            }
        }
    }
}

