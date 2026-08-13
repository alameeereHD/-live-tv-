import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/proxy')({
  GET: async ({ request }) => {
    const url = new URL(request.url).searchParams.get('url');
    if (!url) return json({ error: 'Missing URL' }, { status: 400 });

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'http://lynovo.cc/',
          'Accept': '*/*',
        },
      });

      const contentType = res.headers.get('content-type') || 'video/MP2T';

      return new Response(res.body, {
        status: res.status,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (e) {
      return json({ error: 'Stream failed' }, { status: 502 });
    }
  },
});
