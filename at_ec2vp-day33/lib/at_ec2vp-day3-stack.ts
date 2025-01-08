import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Console } from 'console';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AtEc2VpDay3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AtEc2VpDay3Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const vpc=ec2.Vpc.fromLookup(this,'atvpc',{
      isDefault: true
    });
    // creating ec2 instance
    const atvm = new ec2.Instance(this,'atvm1',{
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyPair: ec2.KeyPair.fromKeyPairName(this,'atkey','splunk-key'),
      instanceName: 'at-linux-vm',
      associatePublicIpAddress:  true,
    });
    new cdk.CfnOutput ( this,'InstancxeID',{
      description: 'this will print instance ID',
      value: atvm.instanceId,
    },);
    new cdk.CfnOutput ( this,'InstancxeDNS',{
      description: 'this will print instance DNS',
      value: atvm.instancePublicDnsName,
    },);
    
    

  }
}
