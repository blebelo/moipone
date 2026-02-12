"use server";

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function getPresignedPost(
  studentId: string,
  filename: string
) {
  if ((studentId || filename) == null) {
    throw new Error('Upload Parameters Are Null, Please contact support')
  }
  const client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  return createPresignedPost(client, {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `student-documents/${studentId}/${filename}`,
    Conditions: [["content-length-range", 0, 5 * 1024 * 1024]],
  });
}
