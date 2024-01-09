pipeline {
    agent any

    environment {
        // Define environment variables if needed, for example:
        DOCKER_COMPOSE_CMD = "docker-compose -d"
    }

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    // Correct the path to the docker-compose.yml file
                    sh 'docker-compose -f backend/docker-compose.yml build'
                }
            }

        }
        stage('Start Docker Containers') {
            steps {
                // Navigate to the directory containing your docker-compose file
                dir('backend') {
                    // Start the containers
                    sh "docker-compose -f backend/docker-compose.yml up -d"
                }
            }
        }
        stage('Test Application') {
            steps {
                // Define your test steps here
                echo 'Run tests...'
                // For example, if you have a script to test your application:
                // sh './run-tests.sh'
            }
        }
    }
    post {
        always {
            // Take down the Docker environment after the tests are done
            dir('backend') {
                sh "${env.DOCKER_COMPOSE_CMD} down"
            }
        }
    }
}
