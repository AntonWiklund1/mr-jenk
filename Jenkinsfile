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
        //docker down
        stage('Stop Services') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker-compose down'
                    }
                }
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
                        sh 'docker-compose up -d'
                    }
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
    }
    post {
        success {
            echo 'Build succeeded!'
            // send email notification with username
            emailext(
                subject: 'Build Success',
                body: "Build success by ${BUILD_USER}",
                to: 'awiklund76@gmail.com'
            )
        }
        failure {
            echo 'Build failed!'
            // send email notification with username
            emailext(
                subject: 'Build Failed',
                body: "Build failed by ${BUILD_USER}",
                to: 'awiklund76@gmail.com'
            )
        }
    }
}
