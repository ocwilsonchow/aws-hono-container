import { S3Event } from "aws-lambda"

export const handler = async (event: S3Event) => {
  console.log("Received S3 event:", JSON.stringify(event, null, 2))

  // Process each record in the event
  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name
    const objectKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "))

    console.log(`New object created in bucket ${bucketName}: ${objectKey}`)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Successfully processed S3 event" })
  }
}
