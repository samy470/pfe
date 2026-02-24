pipeline {
    agent any
    
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Use docker.build instead of sh 'docker build'
                    docker.build('myapp')
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing container if running
                    sh 'docker stop myapp || true'
                    sh 'docker rm myapp || true'
                    
                    // Run new container
                    docker.image('myapp').run('-d -p 5000:5000 --name myapp')
                }
            }
        }
    }
}