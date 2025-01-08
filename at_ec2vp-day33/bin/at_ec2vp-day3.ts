#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AtEc2VpDay3Stack } from '../lib/at_ec2vp-day3-stack';

const app = new cdk.App();
new AtEc2VpDay3Stack(app, 'AtEc2VpDay3Stack', {
  
 env: { account: '992382386705', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});