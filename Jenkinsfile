pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                withCredentials([
                    file(credentialsId: 'relaychat-frontend-env', variable: 'FRONTEND_ENV'),
                    file(credentialsId: 'relaychat-server-env', variable: 'SERVER_ENV')
                ]) {
                    sh '''
                        cp $SERVER_ENV server/.env
                        cp $FRONTEND_ENV relaychat/.env.local
                        export $(grep -v '^#' relaychat/.env.local | xargs)
                        docker-compose -f $COMPOSE_FILE build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    file(credentialsId: 'relaychat-frontend-env', variable: 'FRONTEND_ENV'),
                    file(credentialsId: 'relaychat-server-env', variable: 'SERVER_ENV')
                ]) {
                    sh '''
                        cp $SERVER_ENV server/.env
                        cp $FRONTEND_ENV relaychat/.env.local
                        export $(grep -v '^#' relaychat/.env.local | xargs)
                        docker-compose -f $COMPOSE_FILE down --remove-orphans
                        docker-compose -f $COMPOSE_FILE up -d
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
            sh 'docker-compose -f $COMPOSE_FILE logs --tail=50 || true'
        }
        cleanup {
            sh 'docker image prune -f'
        }
    }
}
