async function home(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello world from Nigeria' }),
  };
}

export const handler = home;


