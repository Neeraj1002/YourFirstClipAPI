pipeline {
    agent any


    stages {
        stage("Create .env file."){
            steps {
                    script {
                        withCredentials([file(credentialsId: 'env_yourfirstclip_api', variable: 'SECRET_FILE_PATH')]) {
                            sh '''
                            echo "Removing .env file"
                            rm -f .env
                            echo "Creating .env file from secret file"
                            # Write the content of the secret file into the .env file
                            cp $SECRET_FILE_PATH .env
                            '''
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t firstclipapi-image:${BUILD_NUMBER} .'
                echo 'remove running manage container'
                sh 'docker stop firstclipapi-container || true'
                sh 'docker rm firstclipapi-container || true'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d --name firstclipapi-container -p 8002:8002 firstclipapi-image:${BUILD_NUMBER}'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'removing unused artifacts'
                sh 'docker system prune -af'
            }
        }
    }
}
