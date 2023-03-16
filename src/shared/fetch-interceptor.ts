const originalFetch = window.fetch;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function interceptedFetchFn(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  console.log('intercepted');

  const request = new Request(input, init);

  if (request.method == 'POST' && request.url.endsWith('/sign-in')) {
    await sleep(800);
    const username = JSON.parse(init?.body as string).email;
    console.log(username);
    console.log(init?.body);
    const responseBody = new Blob(
      [
        JSON.stringify({
          id: 1,
          firstName: 'Alex',
          lastName: 'Pozdnyakof',
          username: username,
        }),
      ],
      { type: 'application/json' },
    );

    return new Response(responseBody, { status: 200 });
  }
  return originalFetch(input, init);
}

window.fetch = interceptedFetchFn;
