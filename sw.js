self.addEventListener('fetch', (event) => {
  // Only target HTML document requests inside your games folder
  if (event.request.destination === 'document' && event.request.url.includes('/games/')) {
    event.respondWith(
      fetch(event.request).then(async (response) => {
        let htmlText = await response.text();
        
        // Dynamically inject your global save-helper script before </head>
        const injection = `<script src="/save-helper.js"></script>`;
        htmlText = htmlText.replace('</head>', `${injection}</head>`);
        
        return new Response(htmlText, {
          status: response.status,
          headers: response.headers
        });
      })
    );
  }
});