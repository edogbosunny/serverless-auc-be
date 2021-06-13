import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  // destructure the body from the lamda event.
  const { title } = JSON.parse(event.body);
  let isoDate = new Date().toISOString();
  const auctionPayload = {
    // payload,
    id: uuid(),
    status: 'OPEN',
    createdAt: isoDate,
    title
  };

  await dynamoDB.put({
    TableName: 'AuctionsTable',
    Item: auctionPayload
  }).promise();

  return {
    statusCode: 201,
    id: uuid,
    body: JSON.stringify({
      message: 'Hello world from Nigeria',
      auction: auctionPayload,
    }),
  };
}

export const handler = createAuction;


