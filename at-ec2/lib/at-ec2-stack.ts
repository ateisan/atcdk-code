import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AtEc2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   // define default vpc 
   const vpc= ec2.Vpc.fromLookup(this,'ExistingVPC',{
      isDefault:true
   });
   // creating EC2 Instance 
   const at_inst= new ec2.Instance(this,'at_machine',{
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyName: 'splunk-key',
   });
  }
}
