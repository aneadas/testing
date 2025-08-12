import { genCode, nowIso } from './_utils.js';
export const onRequestPost = async ({ env, request }) => {
  const { count = 1, prize = null } = await request.json().catch(()=>({}));
  const n = Math.max(1, Math.min(1000, parseInt(count)));
  const inserted = [];
  for(let i=0;i<n;i++){
    let tries=0, ok=false, finalCode=genCode();
    while(!ok && tries<5){
      try{
        const stmt = env.DB.prepare('INSERT INTO codes(code, prize, created_at) VALUES (?, ?, ?)').bind(finalCode, prize || null, nowIso());
        await stmt.run();
        inserted.push(finalCode); ok=true;
      }catch(e){ tries++; finalCode = genCode(); }
    }
  }
  return new Response(JSON.stringify({ ok:true, codes: inserted }), { headers: { 'content-type': 'application/json' } });
};
