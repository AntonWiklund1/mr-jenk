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
        stage('Test Docker') {
            steps {
                script {
                    sh 'docker ps'
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
    }
}
