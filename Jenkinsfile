#!groovy

node('node') {
    currentBuild.result = "SUCCESS"
    try {
       stage('Checkout'){
          checkout scm
       }

       stage('Build'){
         env.NODE_ENV = "production"
         print "Environment will be : ${env.NODE_ENV}"
         sh 'node -v'

         sh 'npm install yarn'
         //sh 'npm prune'
         sh 'yarn install'
       }

       stage('Deploy'){
        echo "Deployment active. please stand clear"
       }



        stage('Publish') {
          echo 'Publishing..'
          withCredentials([usernamePassword(credentialsId: 'whatever555', passwordVariable: 'GITHUB_TOKEN', usernameVariable: 'GITHUB_USER')]) {
            sh 'npx semantic-release --dry-run'
          }
          notifyBuild('OK', 'No script to publish')
        }


       stage('Cleanup'){
         //echo 'prune and cleanup'
         //sh 'npm prune'
         //sh 'rm node_modules -rf'

         mail body: 'project build successful',
                     from: 'jenkins@jenkins.com',
                     replyTo: 'jenkins@jenkins.com',
                     subject: 'project build successful',
                     to: 'i_am_uggie@yahoo.com'
       }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
         mail body: 'project build failed',
                     from: 'jenkins@jenkins.com',
                     replyTo: 'jenkins@jenkins.com',
                     subject: 'project build successful',
                     to: 'i_am_uggie@yahoo.com'

        throw err
    }

}
