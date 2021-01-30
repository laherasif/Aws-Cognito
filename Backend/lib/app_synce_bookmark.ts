import * as cdk from '@aws-cdk/core';

import * as cognito from '@aws-cdk/aws-cognito'

export class AppsyncLambdaBookMarkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
   let userPool =  new cognito.UserPool(this, 'myuserpool', {
     selfSignUpEnabled : true ,
     accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
     userVerification : {
       emailStyle : cognito.VerificationEmailStyle.CODE
     },
     autoVerify : {
       email : true
     } ,
     standardAttributes : {
       email : {
         required: true ,
         mutable : true,

       },
       phoneNumber:{
         required : true,
         mutable : true
       }
       
     }
    });


    let UserPoolclient = new cognito.UserPoolClient(this , "clientPool" , {
      userPool,
    });

    new cdk.CfnOutput(this , "UserPoolId" , {
      value : userPool.userPoolId
    })
   
    new cdk.CfnOutput(this , "UserPoolClientId", {
      value : UserPoolclient.userPoolClientId
    })
  }
}
