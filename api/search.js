export default async function handler(req, res) {
  // 1. 获取前端传来的查询参数 q
  const { q } = req.query;

  // 2. 你的 Render 后端地址
  const targetUrl = `https://pan-2iav.onrender.com/api/search?q=${encodeURIComponent(q || '')}`;

  try {
    // 3. 让 Vercel 服务器去请求 Render
    const response = await fetch(targetUrl);
    
    // 4. 拿到数据
    const data = await response.json();

    // 5. 允许浏览器访问 (解决 CORS 的关键)
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // 6. 返回数据给前端
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Render', details: error.message });
  }
}
