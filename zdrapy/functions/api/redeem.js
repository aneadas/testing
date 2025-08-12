export const onRequestPost = async ({ env, request }) => {
  const { code } = await request.json().catch(()=>({}));
  if(!code) return new Response('Missing code', { status: 400 });
  const upper = String(code).toUpperCase().trim();
  const existing = await env.DB.prepare('SELECT id, redeemed_at FROM codes WHERE code=?').bind(upper).first();
  if(!existing) return new Response('Not found', { status: 404 });
  if(existing.redeemed_at) return new Response('Already redeemed', { status: 409 });
  const ip = (request.headers.get('CF-Connecting-IP')||'');
  const ts = new Date().toISOString().replace('T',' ').replace('Z','');
  await env.DB.prepare('UPDATE codes SET redeemed_at=?, redeemed_ip=? WHERE id=?').bind(ts, ip, existing.id).run();
  return new Response(JSON.stringify({ ok:true, redeemed_at: ts }), { headers: { 'content-type': 'application/json' } });
};
