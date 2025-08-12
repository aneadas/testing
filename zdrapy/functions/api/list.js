export const onRequestGet = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT id, code, prize, created_at, redeemed_at, redeemed_ip FROM codes ORDER BY id DESC LIMIT 50').all();
  return new Response(JSON.stringify({ rows: results }), { headers: { 'content-type': 'application/json' } });
};
