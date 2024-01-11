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
        stage('Check Java Version') {
            steps {
                sh 'java -version'
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
                dir('backend/microservices/user-ms/') {
                    sh 'mvn test'
                    sh 'ls -lR target/surefire-reports'
                }
            }
            post {
                always {
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
