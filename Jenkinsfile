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
        stage('Generate Certificates') {
            steps {
                sh './create.sh'
            }
        }
        stage('Frontend test') {
            environment {
                PATH = "/root/.nvm/versions/node/v20.11.0/bin:$PATH"
            }
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm install -g @angular/cli@17'
                        sh 'ng test --browsers=ChromeHeadless --watch=false'
                    }
                }
            }
        }
        stage('Start Services') {
            steps {
                script {
                    dir('backend') {
                        //start user-ms
                        sh 'docker-compose up -d --build'
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
        stage('Stop services') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker-compose down'
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    ansiblePlaybook(
                      colorized: true,
                      credentialsId: 'deployssh',
                      disableHostKeyChecking: true,
                      installation: 'Ansible',
                      inventory: '/etc/ansible',
                      playbook: './playbook.yml',
                      vaultTmpPath: ''
                  )
                }
            }
        }
    }
    post {
        success {
            // Use the environment variables to set the subject and body dynamically
            emailext(
            subject: "\$PROJECT_NAME - Build # \$BUILD_NUMBER - SUCCESS",
            body: "Check console output at \$BUILD_URL to view the results.",
            to: 'awiklund76@gmail.com'
        )
        }
        failure {
            // Use the environment variables to set the subject and body dynamically
            emailext(
            subject: "\$PROJECT_NAME - Build # \$BUILD_NUMBER - FAILURE",
            body: "Check console output at \$BUILD_URL to view the results.",
            to: 'awiklund76@gmail.com'
            )
        }
        always {
            // Delete the workspace after every build
            cleanWs()
            sh 'docker system prune -f'
        }
    }
}
