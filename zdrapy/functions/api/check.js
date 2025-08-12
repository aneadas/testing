export const onRequestGet = async ({ env, request }) => {
  const u = new URL(request.url);
  const code = (u.searchParams.get('code')||'').toUpperCase().trim();
  if(!code) return new Response('Missing code', { status: 400 });
  const row = await env.DB.prepare('SELECT code, prize, redeemed_at FROM codes WHERE code = ?').bind(code).first();
  if(!row) return new Response(JSON.stringify({ found:false }), { headers: { 'content-type': 'application/json' } });
  return new Response(JSON.stringify({ found:true, ...row }), { headers: { 'content-type': 'application/json' } });
};
