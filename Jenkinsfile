pipeline {
    agent any

    stages {
        stage('hello world') {
            steps {
                echo 'hello world'
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

                    // Your additional commands here
                    }
                }
            }
        }
    }
    post {
        // Define actions to take after the entire pipeline runs.
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
