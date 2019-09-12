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
         //echo 'Push to Repo'
         //sh './dockerPushToRepo.sh'
         //echo 'ssh to web server and tell it to pull new image'
         //sh 'ssh deploy@xxxxx.xxxxx.com running/xxxxxxx/dockerRun.sh'
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
