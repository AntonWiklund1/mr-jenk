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
        // stage('Unit Test') {
        //     steps {
        //         dir('backend/microservices/user-ms/') {
        //             sh 'mvn test'
        //         }
        //     }
        //     post {
        //         always {
        //             dir('backend/microservices/user-ms/') {
        //                 junit 'target/surefire-reports/TEST-*.xml'
        //             }
        //         }
        //     }
        // 
        // }
        stage('Stop services') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker-compose down'
                    }
                }
            }
        }
        stage('Frontend test') {
            environment {
                PATH = "/root/.nvm/versions/node/v20.11.0/bin:$PATH"
            }
            steps {
                script {
                    dir('frontend') {
                        sh 'pwd'
                        sh 'npm install'
                        sh 'npm install -g @angular/cli@17'
                        sh 'ng test --browsers=ChromeHeadless --watch=false'
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Build succeeded!'

            emailext(
            subject: 'Build succeeded',
            body: 'Build succeeded by winner',
            to: 'awiklund76@gmail.com'
            )

        //deploy to staging
        }
        failure {
            echo 'Build failed!'
            emailext(
            subject: 'Build failed',
            body: 'Build failed by loser',
            to: 'awiklund76@gmail.com'
        )
        }
    }
}
