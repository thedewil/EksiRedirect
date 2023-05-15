addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const apiUrl = 'https://api.redirect-checker.net/?url=https%3A%2F%2Feksisozluk.com&timeout=5&maxhops=10&meta-refresh=1&format=json';

  // Fetch the JSON API
  const response = await fetch(apiUrl)

  if (response.ok) {
    const json = await response.json()

    if (json.data && json.data[1] && json.data[1].response && json.data[1].response.info && json.data[1].response.info.url) {
      const redirectUrl = json.data[1].response.info.url

      // Extract path and query parameters from the original request URL
      const originalUrl = new URL(request.url)
      const pathAndQuery = originalUrl.pathname + originalUrl.search

      // Append path and query parameters to the redirect URL
      const redirectedUrl = redirectUrl + pathAndQuery

      // Redirect the visitor to the obtained URL with path and query parameters
      return Response.redirect(redirectedUrl, 302)
    }
  }

  // Return a response indicating an error or fallback action
  return new Response('Hata.', { status: 500 })
}
