node {
   stage 'checkout'
   git url: 'git@github.com:diegomors/soap-client.git'

   // Maven
   def mvnHome = tool 'Maven 3.3.3'

   stage 'testes, construcao e arquivamento'
   sh "${mvnHome}/bin/mvn -B verify -P${BRANCH_NAME}"

   stage 'notificacao'
   slackSend "Build Finished - ${env.JOB_NAME} ${env.BUILD_NUMBER}  ()"
}