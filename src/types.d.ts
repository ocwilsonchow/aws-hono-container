import { Resource } from "sst"

declare module "sst" {
  export interface Resource {
    MyBucket: {
      name: string
    }
  }
}
