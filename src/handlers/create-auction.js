import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
// import httpJsonBodyParser from '@middy/http-json-body-parser';
// import middy from '@middy/core';
// import httpEventNormalizer from '@middy/http-event-normalizer';
// import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
import commonmiddleware from '../lib/commonmiddlewarres';

async function createAuction(event, context) {
  // destructure the body from the lamda event.
  const { title } = event.body;
  let isoDate = new Date().toISOString();
  const auctionPayload = {
    // payload,
    id: uuid(),
    status: 'OPEN',
    createdAt: isoDate,
    title
  };

  // await dynamoDB.put({
  //   TableName: process.env.AUCTIONS_TABLE_NAME,
  //   // TableName: 'AuctionsTable',
  //   Item: auctionPayload
  // }).promise();

  try {
    await dynamoDB.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auctionPayload,
    }).promise();
  } catch(error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    id: uuid,
    body: JSON.stringify({
      message: 'Hello world from Nigeria',
      auction: auctionPayload,
    }),
  };
}

export const handler = commonmiddleware(createAuction);
// export const handler = middy(createAuction)
//   .use(httpJsonBodyParser())
//   .use(httpEventNormalizer())
//   .use(httpErrorHandler());
