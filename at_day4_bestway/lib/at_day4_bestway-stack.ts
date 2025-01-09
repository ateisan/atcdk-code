import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class AtDay4BestwayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AtDay4BestwayQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const bucketNames = ['atday4bestwaybucket1', 'atday4bestwaybucket2', 'atday4bestwaybucket3'];
    for (let bucketName of bucketNames) {
      const bucket = new s3.Bucket(this, bucketName, {
        versioned: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
        autoDeleteObjects: true, // NOT recommended for production code
        bucketName: bucketName
      });
    }
    
    const bucket = new s3.Bucket(this, 'AtDay4BestwayBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true, // NOT recommended for production code
      bucketName: 'atday4bestwaybucket'
    });
  }
}
