pipeline {
    agent any

    environment {
        // Define environment variables if needed, for example:
        DOCKER_COMPOSE_CMD = "docker-compose -d"
    }

    stages {
        stage('Build Docker Images') {
            steps {
                // Navigate to the directory containing your docker-compose file
                dir('backend') {
                    // Run docker-compose to build the images
                    sh "${env.DOCKER_COMPOSE_CMD} build"
                }
            }
        }
        stage('Start Docker Containers') {
            steps {
                // Navigate to the directory containing your docker-compose file
                dir('backend') {
                    // Start the containers
                    sh "${env.DOCKER_COMPOSE_CMD} up -d"
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
