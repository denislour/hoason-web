export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  const referer = request.headers.get('referer');
  const acceptLanguage = request.headers.get('accept-language');
  const clientIP = request.headers.get('x-nf-client-connection-ip') ||
                   request.headers.get('x-forwarded-for') ||
                   'unknown';

  // Danh sách các user agents cần block
  const blockedAgents = [
    'curl',
    'wget',
    'python-requests',
    'scrapy',
    'postman',
    'insomnia',
    'httpie',
    'axios',
    'node-fetch',
    'go-http-client',
    'java-http-client',
    'okhttp',
    'libwww-perl',
    'lwp-trivial',
    'winhttp',
    'microsoft-cryptoapi',
    'python-urllib',
    'requests',
    'urllib'
  ];

  // Kiểm tra User-Agent
  const userAgentLower = userAgent.toLowerCase();
  const isBlockedAgent = blockedAgents.some(agent =>
    userAgentLower.includes(agent.toLowerCase())
  );

  // Kiểm tra các dấu hiệu của bot/scraping
  const suspiciousPatterns = [
    // Không có Accept header
    !accept || accept.length === 0,

    // Accept header không chứa text/html
    accept && !accept.includes('text/html') && !accept.includes('*/*'),

    // Không có Accept-Language header
    !acceptLanguage || acceptLanguage.length === 0,

    // User-Agent rỗng hoặc quá ngắn
    !userAgent || userAgent.length < 10,

    // User-Agent chứa các từ khóa đáng ngờ
    userAgentLower.includes('bot') ||
    userAgentLower.includes('crawler') ||
    userAgentLower.includes('spider') ||
    userAgentLower.includes('scraper') ||
    userAgentLower.includes('automated') ||
    userAgentLower.includes('script')
  ];

  // Đếm số suspicious patterns
  const suspiciousScore = suspiciousPatterns.filter(Boolean).length;

  // Log để debug (có thể bỏ trong production)
  console.log(`Request from ${clientIP} - UA: ${userAgent} - Suspicious score: ${suspiciousScore}`);

  // Block ngay nếu user agent trong danh sách đen
  if (isBlockedAgent) {
    return new Response('Access denied: Automated tool detected', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      }
    });
  }

  // Block nếu có quá nhiều dấu hiệu đáng ngờ
  if (suspiciousScore >= 3) {
    return new Response('Access denied: Suspicious request detected', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      }
    });
  }

  // Cho phép request bình thường
  return context.next();
};
