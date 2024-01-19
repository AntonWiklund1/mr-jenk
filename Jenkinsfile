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
        stage('Frontend test') {
            environment {
                PATH = "/root/.nvm/versions/node/v20.11.0/bin:$PATH"
            }
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm install -g @angular/cli@17'
                        sh 'ng test --browsers=ChromeHeadless --watch=false --code-coverage --reporters=junit'
                    }
                }
            }
            post {
                always {
                    junit '**/frontend/test-results.xml'
                }
            }
        }
    }
    post {
        success {
            sh 'echo "Build succeeded go to https://164.90.180.143:4200"'

            emailext(
            subject: 'Build succeeded',
            body: 'Build succeeded by winner',
            to: 'awiklund76@gmail.com'
            )
            // Deploy to another droplet
            sshagent(['jenkins-ssh-key-id']) {
                script {
                    try {
                        // SSH into the DigitalOcean droplet and execute deployment commands
                        def sshCommand = '''
                            ssh -v root@164.90.180.143 "\
                            cd /buy-01 && \
                            cd mr-jenk && \
                            git pull origin main && \
                            ./create.sh && \
                            cd backend && \
                            docker-compose up -d --build \
                            "
                        '''
                        def sshOutput = sh(script: sshCommand, returnStatus: true)
                        if (sshOutput != 0) {
                            error "SSH command failed with exit code ${sshOutput}"
                        }
                    } catch (Exception e) {
                        error "Error in SSH execution: ${e.message}"
                    }
                }
            }
        }
        failure {
            emailext(
            subject: 'Build failed',
            body: 'Build failed by loser',
            to: 'awiklund76@gmail.com'
        )
        }
    }
}
