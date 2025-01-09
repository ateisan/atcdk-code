#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AtDay4BestwayStack } from '../lib/at_day4_bestway-stack';
import { AtDay4ec2all } from '../lib/at_day4_ec2all';

const app = new cdk.App();
new AtDay4BestwayStack(app, 'AtDay4BestwayStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
  // env: { account: '992382386705', region: 'us-east-1' },
});

new AtDay4ec2all(app, 'AtDay4ec2all', {
  env: { account: '992382386705', region: 'us-east-1' },
});