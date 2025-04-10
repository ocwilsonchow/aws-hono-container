// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-hono-container",
      removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
      home: "aws",
    }
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc", {
      az: ["ap-east-1b", "ap-east-1c"],
    })
    const cluster = new sst.aws.Cluster("MyCluster", { vpc })
    const bucket = new sst.aws.Bucket("MyBucket")
    const api = new sst.aws.ApiGatewayV2("MyApi", { vpc })
    const service = new sst.aws.Service("MyService", {
      cluster,
      serviceRegistry: {
        port: 80,
      },
      dev: {
        command: "pnpm run dev",
      },
      link: [bucket],
    })

    api.routePrivate("$default", service.nodes.cloudmapService.arn)

    return {
      bucket: bucket.name,
      api: api.url,
    }
  },
})
