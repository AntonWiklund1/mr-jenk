/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any
    //etst
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Generate Certificates') {
            steps {
                sh './create.sh'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('safe-zone') {
                        dir('backend/microservices/user-ms/') {
                            sh '''
                        mvn clean verify sonar:sonar \
                          -Dsonar.projectKey=safe-zone \
                          -Dsonar.projectName='safe-zone' \
                          -Dsonar.host.url=http://207.154.208.44:9000 \
                          -Dsonar.token=sqp_940f70d246a1046e0d4b2bb15c16eebae98a3590
                        '''
                        }
                    }
                    timeout(time: 1, unit: 'HOURS') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
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
                        sh 'ng test --browsers=ChromeHeadless --watch=false'
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
            emailext(
            subject: "\$PROJECT_NAME - Build # \$BUILD_NUMBER - FAILURE",
            body: "Check console output at \$BUILD_URL to view the results.",
            to: 'awiklund76@gmail.com'
            )
        }
        always {
            sh 'docker system prune -f'
        }
    }
}
