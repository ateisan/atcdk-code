import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AtDay4ec2all extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AtDay4BestwayQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const vpc=ec2.Vpc.fromLookup(this,'atvpc',{
        isDefault: true
      });
      ////////////////////////////
      // Create a security group
      const securityGroup = new ec2.SecurityGroup(this, 'atSecurityGroup', {
        vpc,
        description: 'Allow ssh and http access',
        allowAllOutbound: true,
        securityGroupName: 'atSecurityGroup'
      });
      // Allow inbound FTP access from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(21), 'allow ftp access from anywhere');
      // Allow inbound HTPS access from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'allow https access from anywhere');

      // Allow inbound SSH access from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow ssh access from anywhere');

      // Allow inbound HTTP access from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http access from anywhere');

      // creating ec2 instance
      const atvm = new ec2.Instance(this, 'atvm1', {
        vpc,
        instanceType: new ec2.InstanceType('t2.micro'),
        machineImage: new ec2.AmazonLinuxImage(),
        keyPair: ec2.KeyPair.fromKeyPairName(this, 'atkey', 'splunk-key'),
        instanceName: 'at-linux-vm',
        securityGroup: securityGroup, // Attach the security group to the instance
        // associatePublicIpAddress:  true,
      });
      ////////////////////////////
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
