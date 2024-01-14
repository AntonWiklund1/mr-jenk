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
            def buildUser = currentBuild.changeSets.collectMany { changeSet ->
                changeSet.items.collect { change -> change.author.fullName }
            }.join(', ')

            emailext(
            subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS",
            body: "Build succeeded by ${buildUser}.",
            to: 'awiklund76@gmail.com'
        )
        }
        failure {
            echo 'Build failed!'
            def buildUser = currentBuild.changeSets.collectMany { changeSet ->
                changeSet.items.collect { change -> change.author.fullName }
                }.join(', ')

            emailext(
            subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - FAILED",
            body: "Build failed by ${buildUser}.",
            to: 'awiklund76@gmail.com'
        )
        }
    }
}
