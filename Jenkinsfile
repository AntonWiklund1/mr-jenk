pipeline {
    agent any

    stages {
        // stage('Build Docker Images') {
        //     steps {
        //         script {
        //             // Use the correct path relative to the Jenkins workspace
        //             sh 'docker-compose -f backend/docker-compose.yml build'
        //         }
        //     }
        // }
        // stage('start docker-compose') {
        //     steps {
        //         script {
        //             // Use the correct path relative to the Jenkins workspace
        //             sh 'docker-compose -f backend/docker-compose.yml up -d'
        //         }
        //     }
        // }
        stage('Run Tests') {
            steps {
                script {
                    // Use the correct path relative to the Jenkins workspace
                    sh "echo 'Running tests...'"
                }
            }
        }
        // Other stages...
    }
    // Post actions...
}
