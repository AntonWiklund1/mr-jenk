pipeline {
    agent any

    stages {
        stage('hello world') {
            steps {
                echo 'hello world'
            }
        }
    //     stage('Checkout SCM') {
    //         steps {
    //             checkout scm
    //             sh 'ls -al' // List all files in the workspace
    //             sh 'git status' // Show the status of the Git repository
    //         }
    //     }
    //     // Only use cleanWs() here if you want to clear out old workspace data
    //     // before checking out new code. If used after 'Checkout SCM', it will
    //     // delete the freshly checked-out code.
    //     stage('Build Docker Images') {
    //         steps {
    //             script {
    //                 // Builds Docker images using docker-compose
    //                 sh 'docker-compose -f backend/docker-compose.yml build'
    //             }
    //         }
    //     }
    //     stage('Start Docker Compose') {
    //         steps {
    //             script {
    //                 // Starts Docker containers in the background
    //                 sh 'docker-compose -f backend/docker-compose.yml up -d'
    //             }
    //         }
    //     }
    //     // Other stages such as 'Test', 'Deploy', etc. can be added here.
    // }
    // post {
    //     always {
    //         // Clean up the workspace after the pipeline runs, if desired.
    //         cleanWs()
    //     }
    }
}
