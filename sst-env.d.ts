/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "MyApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "MyBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "MyService": {
      "service": string
      "type": "sst.aws.Service"
    }
    "MyVpc": {
      "type": "sst.aws.Vpc"
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}