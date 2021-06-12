async function hello(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello world from Nigeria' }),
  };
}

export const handler = hello;


