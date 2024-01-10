pipeline {
    agent any

    stages {
        stage('Hello World') {
            steps {
                echo 'Hello World'
            }
        }
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
        stage('Docker Compose') {
            steps {
                dir('backend') {
                    script {
                        // Run Docker Compose up
                        sh 'docker-compose up -d'
                        // Wait for services to be up
                        sh 'sleep 30'
                    }
                }
            }
        }
        // stage('Test') {
        //     steps {
        //         dir('backend') {
        //             script {
        //                 // Your test commands here
        //                 sh './run-tests.sh'
        //             }
        //         }
        //     }
        // }
    }
    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
        always {
            // Clean up the workspace to free space.
            dir('backend') {
                sh 'docker-compose down'
            }
        }
    }
}
