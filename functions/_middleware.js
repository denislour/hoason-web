// Cloudflare Pages Middleware bảo vệ project NTH
// Chống các tools tự động nhưng vẫn cho phép search engines và người dùng bình thường

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';
  const accept = request.headers.get('Accept') || '';
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const referer = request.headers.get('Referer') || '';
  const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For');

  // Danh sách search engine crawler hợp lệ
  const legitimateBots = [
    'googlebot',
    'googlebot-news',
    'googlebot-image',
    'mediapartners-google',
    'adsbot-google',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'yandeximages',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'pinterestbot',
    'slackbot',
    'applebot',
    'amazonbot',
    'msnbot',
    'ia_archiver',
    'archive.org_bot',
    'semrushbot',
    'ahrefsbot',
    'majestic12'
  ];

  // Kiểm tra legitimate bot
  const isLegitimateBot = legitimateBots.some(bot =>
    userAgent.toLowerCase().includes(bot)
  );

  // Cho phép legitimate bots truy cập
  if (isLegitimateBot) {
    // Log legitimate bot access
    console.log(`LEGITIMATE_BOT: ${userAgent.substring(0, 100)} - ${url.pathname}`);
    return context.next();
  }

  // Danh sách các tools tự động và bot đáng ngờ
  const suspiciousPatterns = [
    // Command line tools
    'curl',
    'wget',
    'python-requests',
    'python-urllib',
    'scrapy',
    'beautifulsoup',
    'selenium',
    'phantomjs',
    'headless',
    'playwright',
    'puppeteer',

    // HTTP clients
    'postman',
    'insomnia',
    'httpie',
    'axios',
    'node-fetch',
    'fetch',
    'unirest',
    'superagent',
    'request',

    // Programming languages
    'java',
    'okhttp',
    'retrofit',
    'alamofire',
    'afnetworking',
    'volley',

    // Scraping tools
    'cheerio',
    'jsoup',
    'nokogiri',
    'htmlagilitypack',
    'guzzle',

    // Other automated tools
    'lwp',
    'libwww',
    'winhttp',
    'httputil',
    'webzip',
    'teleport',
    'offline',
    'copier',
    'webstripper',
    'downloader'
  ];

  // Kiểm tra User-Agent đáng ngờ
  const isSuspiciousUA = suspiciousPatterns.some(pattern =>
    userAgent.toLowerCase().includes(pattern)
  );

  // Chặn nếu User-Agent đáng ngờ
  if (isSuspiciousUA) {
    console.log(`BLOCKED - Suspicious UA: ${userAgent.substring(0, 100)} - IP: ${clientIP} - Path: ${url.pathname}`);
    return new Response('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Blocked-By': 'Cloudflare Pages Middleware',
        'X-Block-Reason': 'Suspicious User-Agent Detected',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }

  // Chặn User-Agent rỗng, null, hoặc quá ngắn
  if (!userAgent || userAgent === '' || userAgent === 'null' || userAgent === 'undefined' || userAgent.length < 10) {
    console.log(`BLOCKED - Empty/Invalid UA: ${userAgent} - IP: ${clientIP}`);
    return new Response('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Blocked-By': 'Cloudflare Pages Middleware',
        'X-Block-Reason': 'Empty or Invalid User-Agent',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  }

  // Kiểm tra missing headers (đặc trưng của curl/simple requests)
  const missingHeaders = !accept || !acceptLanguage || accept.length < 10 || acceptLanguage.length < 2;

  if (missingHeaders && userAgent.length < 50) {
    console.log(`BLOCKED - Missing Headers: Accept=${accept.length}, Lang=${acceptLanguage.length} - UA: ${userAgent.substring(0, 50)}`);
    return new Response('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Blocked-By': 'Cloudflare Pages Middleware',
        'X-Block-Reason': 'Missing Required Headers',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  }

  // Cho phép iframe truy cập vào bea-ton.html từ chính trang web
  if (url.pathname === '/bea-ton.html' && referer.includes('hoason10.com')) {
    console.log(`ALLOWED - Iframe access: ${url.pathname} - Referer: ${referer}`);
    return context.next();
  }

  // Cho phép các file tĩnh và assets
  if (url.pathname.includes('/assets/') ||
      url.pathname.includes('/static/') ||
      url.pathname.includes('/img/') ||
      url.pathname.includes('/css/') ||
      url.pathname.includes('/js/') ||
      url.pathname.includes('/fonts/')) {
    return context.next();
  }

  // Cho phép các file quan trọng
  const allowedFiles = [
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap_index.xml',
    '/favicon.ico',
    '/favicon.png',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/manifest.json',
    '/service-worker.js',
    '/sw.js'
  ];

  if (allowedFiles.includes(url.pathname)) {
    return context.next();
  }

  // Cho phép các file hình ảnh và media
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|mp3|mp4|avi|mov|pdf|zip|rar)$/i)) {
    return context.next();
  }

  // Log suspicious requests nhưng không block
  if (isSuspiciousUA || missingHeaders) {
    console.log(`SUSPICIOUS - Score: High, IP: ${clientIP}, UA: ${userAgent.substring(0, 50)}, Path: ${url.pathname}`);
  }

  // Cho phép request bình thường đi qua
  return context.next();
}
