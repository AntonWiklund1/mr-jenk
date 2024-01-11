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
        stage('Start Services') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker-compose up -d'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                // Run tests - they will interact with services started by Docker Compose
                sh 'mvn test'
            }
            post {
                always {
                    // Collect test reports
                    junit '**/target/surefire-reports/TEST-*.xml'
                }
            }
        }

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
