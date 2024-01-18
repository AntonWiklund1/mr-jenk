/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

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
        stage('Start Services') {
            steps {
                script {
                    dir('backend') {
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
                        sh 'npm i'
                        sh 'npm i -g @angular/cli@17'
                        sh 'ng test --browsers=ChromeHeadless --watch=false'
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
            echo 'Build succeeded! Go to https://164.90.180.143:4200/'
            emailext(
        subject: 'Build succeeded',
        body: 'Build succeeded by winner',
        to: 'awiklund76@gmail.com'
            )
        }
    failure {
        script {
            def failedStage = ""
            def causes = currentBuild.rawBuild.getCauses()
            for (cause in causes) {
                if (cause instanceof hudson.model.Cause.UpstreamCause) {
                    def upstreamProject = cause.getUpstreamProject()
                    def upstreamBuild = cause.getUpstreamBuild()
                    failedStage = "${upstreamProject.getName()} #${upstreamBuild.number}"
                }
            }
            echo "Failed stage: ${failedStage}"
        }
        emailext(
            subject: 'Build failed',
            body: "Build failed by loser\nFailed stage: ${failedStage}",
            to: 'awiklund76@gmail.com'
            )
        }
    }
}
