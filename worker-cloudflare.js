export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Mengarahkan admin ke halaman login GitHub
    if (url.pathname === '/auth') {
      return Response.redirect(`https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user`, 302);
    }

    // 2. Menangkap kode otorisasi dan menukarnya dengan Token GitHub
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Akses ditolak', { status: 400 });

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code: code
        })
      });

      const data = await tokenResponse.json();
      const token = data.access_token;

      // 3. Mengirim token kembali ke halaman admin Decap CMS
      const html = `
        <!DOCTYPE html>
        <html><body><script>
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}","provider":"github"}',
            '*'
          );
          window.close();
        </script></body></html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('OAuth Proxy Azizah Cake Aktif', { status: 200 });
  }
};