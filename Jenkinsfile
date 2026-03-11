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

        stage('Install & Build: Server') {
            steps {
                dir('server') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Install & Build: Frontend') {
            steps {
                dir('relaychat') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
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
                        export $(grep -v '^#' $FRONTEND_ENV | xargs)
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
                        export $(grep -v '^#' $FRONTEND_ENV | xargs)
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
            sh 'docker-compose -f $COMPOSE_FILE logs --tail=50'
        }
        cleanup {
            sh 'docker system prune -f'
        }
    }
}
