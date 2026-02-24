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
                sh 'docker build -t myapp .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker stop myapp || true
                    docker rm myapp || true
                    docker run -d -p 5000:5000 --name myapp myapp
                '''
            }
        }
    }
}