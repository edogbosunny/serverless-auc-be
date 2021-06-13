import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonmiddleware from '../lib/commonmiddlewarres';
// import httpJsonBodyParser from '@middy/http-json-body-parser';
// import middy from '@middy/core';
// import httpEventNormalizer from '@middy/http-event-normalizer';
// import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {

  let auction = null;
  const { id } = event.pathParameters;

  try {
    auction = await dynamoDB.get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    }).promise();

    console.log('---->aw', auction);

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction?.Item) {
    throw new createError.NotFound(`Auction with ID  "${id}" not found`);
  }
  return {
    statusCode: 200,
    id: uuid,
    body: JSON.stringify({
      auctions: auction?.Item,
    }),
  };
}

export const handler = commonmiddleware(getAuction);
// export const handler = middy(getAuction)
  // .use(httpJsonBodyParser())
  // .use(httpEventNormalizer())
  // .use(httpErrorHandler());

