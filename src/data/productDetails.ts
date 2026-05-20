export interface ProductFeature {
  icon: string
  title: { vi: string; en: string }
  desc: { vi: string; en: string }
}

export interface HowItWorksStep {
  number: string
  title: { vi: string; en: string }
  desc: { vi: string; en: string }
}

export interface PainPoint {
  icon: string
  text: { vi: string; en: string }
}

export interface ProductDetail {
  tagline: { vi: string; en: string }
  heroDesc: { vi: string; en: string }
  painPoints: PainPoint[]
  features: ProductFeature[]
  howItWorks: HowItWorksStep[]
  results: { metric: string; label: { vi: string; en: string } }[]
  faq: { q: { vi: string; en: string }; a: { vi: string; en: string } }[]
}

export const productDetails: Record<string, ProductDetail> = {
  'digital-office': {
    tagline: {
      vi: 'Đội AI 5 người làm việc 24/7 — không lương, không nghỉ lễ',
      en: 'A 5-agent AI team working 24/7 — no salary, no holidays',
    },
    heroDesc: {
      vi: 'Bạn đang trả lương cho người để làm những việc lặp đi lặp lại mỗi ngày? Digital Office thay thế toàn bộ bằng hệ thống đa tác nhân AI: tự lên kế hoạch, tự phân công, tự thực thi, tự kiểm tra. Bạn chỉ cần giao việc — và nhận kết quả.',
      en: 'Are you paying people to do the same repetitive tasks every day? Digital Office replaces all of that with a multi-agent AI system: self-planning, self-assigning, self-executing, self-reviewing. You just delegate — and receive results.',
    },
    painPoints: [
      { icon: '💸', text: { vi: 'Trả lương nhân sự để làm việc lặp đi lặp lại mỗi ngày', en: 'Paying staff for the same repetitive tasks every single day' } },
      { icon: '⏰', text: { vi: 'Công việc tắc nghẽn vì phụ thuộc vào một người duy nhất', en: 'Workflow bottlenecked by a single person\'s availability' } },
      { icon: '😩', text: { vi: 'Không biết task đang ở đâu, ai đang làm gì, tiến độ thế nào', en: 'No visibility into who is doing what or current progress' } },
    ],
    features: [
      {
        icon: '🧠',
        title: { vi: 'Planner: Phân tích & chia nhỏ task', en: 'Planner: Analyze & decompose tasks' },
        desc: {
          vi: 'Claude Sonnet nhận yêu cầu của bạn bằng tiếng Việt, hiểu ngữ cảnh, và tự chia nhỏ thành các bước có thể thực thi. Không cần format đặc biệt.',
          en: 'Claude Sonnet receives your request in plain language, understands context, and breaks it into executable steps. No special format required.',
        },
      },
      {
        icon: '📋',
        title: { vi: 'Manager: Giao đúng người, đúng việc', en: 'Manager: Right person, right task' },
        desc: {
          vi: 'Gemini Flash đọc skill profile của từng worker và tự phân công task phù hợp. Không có tình trạng một người làm hết, một người ngồi chơi.',
          en: 'Gemini Flash reads each worker\'s skill profile and assigns tasks accordingly. No more one person overloaded while another is idle.',
        },
      },
      {
        icon: '⚡',
        title: { vi: 'Workers: Chạy song song, không bottleneck', en: 'Workers: Parallel execution, zero bottleneck' },
        desc: {
          vi: 'Nhiều worker chạy đồng thời qua WebSocket. Task 10 bước hoàn thành nhanh gần bằng task 1 bước nhờ parallel processing.',
          en: 'Multiple workers run simultaneously via WebSocket. A 10-step task completes nearly as fast as a 1-step task thanks to parallel processing.',
        },
      },
      {
        icon: '✅',
        title: { vi: 'Reviewer: Tự kiểm tra chất lượng', en: 'Reviewer: Self quality control' },
        desc: {
          vi: 'Mỗi output đều qua Claude Sonnet review trước khi trả về. Nếu chưa đạt, tự yêu cầu làm lại — tối đa 3 vòng. Bạn nhận kết quả đã được kiểm duyệt.',
          en: 'Every output goes through Claude Sonnet review before returning. If subpar, it automatically requests revision — up to 3 cycles. You receive pre-verified results.',
        },
      },
      {
        icon: '🔄',
        title: { vi: 'Multi-provider: Claude, Gemini, Ollama', en: 'Multi-provider: Claude, Gemini, Ollama' },
        desc: {
          vi: 'Tích hợp sẵn Claude, Gemini, GPT-4o, và Ollama local. Tự động fallback nếu một provider gặp sự cố. Ollama giúp chạy hoàn toàn offline, chi phí $0.',
          en: 'Built-in Claude, Gemini, GPT-4o, and local Ollama. Automatic fallback if a provider fails. Ollama enables fully offline operation at $0 cost.',
        },
      },
      {
        icon: '📊',
        title: { vi: 'Live Graph: Thấy AI đang làm gì', en: 'Live Graph: See what AI is doing' },
        desc: {
          vi: 'Graph tương tác hiển thị realtime từng node đang xử lý, trạng thái, và kết quả. Bạn biết chính xác tiến độ mà không cần đợi hay đoán mò.',
          en: 'Interactive graph displays each node processing in real-time, status, and results. You know exactly the progress without waiting or guessing.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Giao việc bằng ngôn ngữ tự nhiên', en: 'Delegate in natural language' },
        desc: {
          vi: 'Gõ hoặc paste yêu cầu như "Tóm tắt 20 email này và đề xuất reply cho từng cái". Không cần học syntax hay config phức tạp.',
          en: 'Type or paste a request like "Summarize these 20 emails and suggest replies for each." No need to learn syntax or complex configs.',
        },
      },
      {
        number: '02',
        title: { vi: 'Hệ thống tự lên kế hoạch & triển khai', en: 'System self-plans & deploys' },
        desc: {
          vi: 'Planner chia task, Manager phân công cho Workers phù hợp, Workers chạy song song. Toàn bộ diễn ra trong vài giây, hiển thị live trên graph.',
          en: 'Planner breaks down tasks, Manager assigns to suitable Workers, Workers run in parallel. All happens within seconds, displayed live on the graph.',
        },
      },
      {
        number: '03',
        title: { vi: 'Nhận kết quả đã được kiểm duyệt', en: 'Receive pre-reviewed results' },
        desc: {
          vi: 'Reviewer kiểm tra từng output. Kết quả cuối cùng được gộp lại và trả về cho bạn — đã qua ít nhất một vòng quality check tự động.',
          en: 'Reviewer checks each output. Final results are merged and returned to you — already through at least one automatic quality check cycle.',
        },
      },
    ],
    results: [
      { metric: '10×', label: { vi: 'tốc độ so với làm thủ công', en: 'speed vs. manual work' } },
      { metric: '24/7', label: { vi: 'hoạt động không nghỉ', en: 'continuous operation' } },
      { metric: '$0', label: { vi: 'chi phí nhân sự thêm', en: 'additional headcount cost' } },
    ],
    faq: [
      {
        q: { vi: 'Tôi cần biết lập trình không?', en: 'Do I need programming knowledge?' },
        a: { vi: 'Không. Giao diện hoàn toàn bằng ngôn ngữ tự nhiên. Nếu bạn biết dùng email, bạn dùng được Digital Office.', en: 'No. The interface is entirely natural language. If you can use email, you can use Digital Office.' },
      },
      {
        q: { vi: 'Chi phí API mỗi tháng khoảng bao nhiêu?', en: 'What are the monthly API costs?' },
        a: { vi: 'Trung bình $10–50/tháng cho công ty nhỏ dùng Claude/Gemini. Dùng Ollama local thì miễn phí hoàn toàn — chạy trên máy tính của bạn.', en: 'Average $10–50/month for small companies using Claude/Gemini. Using local Ollama is completely free — runs on your own machine.' },
      },
    ],
  },

  'bigdata-pipeline': {
    tagline: {
      vi: 'Đội sales của bạn chỉ gọi đúng người, đúng lúc',
      en: 'Your sales team only calls the right person at the right time',
    },
    heroDesc: {
      vi: 'Bạn có hàng nghìn lead nhưng đội sales gọi không biết gọi ai trước? BigData Pipeline gom toàn bộ dữ liệu thô, làm giàu từ Facebook và Google, rồi AI tự phân nhóm và chấm điểm tiềm năng từng người. Đội sales chỉ thấy những người sẵn sàng mua.',
      en: 'You have thousands of leads but your sales team doesn\'t know who to call first? BigData Pipeline aggregates all raw data, enriches from Facebook and Google, then AI clusters and scores each lead\'s potential. Your sales team only sees people ready to buy.',
    },
    painPoints: [
      { icon: '📊', text: { vi: 'Dữ liệu nằm rải rác ở 5-6 nguồn, không ai tổng hợp được', en: 'Data scattered across 5-6 sources with no unified view' } },
      { icon: '🐌', text: { vi: 'Báo cáo cuối tháng mất cả tuần làm thủ công bằng Excel', en: 'Monthly reports take a full week of manual Excel work' } },
      { icon: '🔍', text: { vi: 'Không phát hiện được vấn đề kịp thời vì thiếu dashboard realtime', en: 'Issues go undetected because there\'s no real-time dashboard' } },
    ],
    features: [
      {
        icon: '📥',
        title: { vi: 'Thu thập từ mọi nguồn', en: 'Collect from any source' },
        desc: {
          vi: 'Import từ Google Sheets, CRM cũ, form leads, file CSV/Excel. Hệ thống tự chuẩn hóa format, xử lý trùng lặp và thiếu sót — không cần làm sạch dữ liệu thủ công.',
          en: 'Import from Google Sheets, legacy CRM, lead forms, CSV/Excel files. System auto-normalizes format, handles duplicates and gaps — no manual data cleaning needed.',
        },
      },
      {
        icon: '🔗',
        title: { vi: 'Enrichment từ Facebook & Google', en: 'Enrich from Facebook & Google' },
        desc: {
          vi: 'Tự động bổ sung thông tin công khai: nghề nghiệp, sở thích, vị trí, công ty từ Facebook và Google. Mỗi lead trở nên "dày" hơn mà không tốn thời gian nghiên cứu.',
          en: 'Automatically supplements public info: profession, interests, location, company from Facebook and Google. Each lead becomes "richer" without spending time on research.',
        },
      },
      {
        icon: '🎯',
        title: { vi: 'AI Clustering tự động', en: 'Automatic AI Clustering' },
        desc: {
          vi: 'Thuật toán K-means nhóm audience thành 5–10 segment dựa trên hành vi và đặc điểm tương đồng. Biết chính xác nhóm nào có tỷ lệ chuyển đổi cao nhất.',
          en: 'K-means algorithm groups audiences into 5–10 segments based on behavioral and demographic similarities. Know exactly which segment has the highest conversion rate.',
        },
      },
      {
        icon: '⭐',
        title: { vi: 'Lead Scoring 0–100 điểm', en: 'Lead Scoring 0–100 points' },
        desc: {
          vi: '20+ tín hiệu tính điểm: tương tác gần đây, mức độ phù hợp profile, hành vi trên website, lịch sử mua hàng. Lead 80+ điểm — gọi ngay hôm nay.',
          en: '20+ scoring signals: recent engagement, profile fit, website behavior, purchase history. Leads scoring 80+ — call today.',
        },
      },
      {
        icon: '📊',
        title: { vi: 'Dashboard phân tích trực quan', en: 'Visual analytics dashboard' },
        desc: {
          vi: 'Chart.js hiển thị phân phối điểm, breakdown theo segment, xu hướng theo tuần. Manager nhìn dashboard biết ngay đội sales cần tập trung vào đâu.',
          en: 'Chart.js displays score distribution, segment breakdown, weekly trends. Managers see the dashboard and instantly know where the sales team should focus.',
        },
      },
      {
        icon: '⚙️',
        title: { vi: 'Pipeline CLI linh hoạt', en: 'Flexible CLI pipeline' },
        desc: {
          vi: 'Chạy pipeline đầy đủ hoặc từng giai đoạn riêng lẻ. Tích hợp vào cron job để tự động cập nhật hàng ngày. Output ra CSV, JSON, hoặc đẩy thẳng vào CRM.',
          en: 'Run the full pipeline or individual stages separately. Integrate with cron jobs for daily auto-updates. Output to CSV, JSON, or push directly into your CRM.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Import & chuẩn hóa dữ liệu', en: 'Import & normalize data' },
        desc: {
          vi: 'Upload file hoặc connect API. Pipeline tự xử lý format khác nhau, loại bỏ duplicate, fill missing values — dữ liệu sạch trong vài phút.',
          en: 'Upload files or connect APIs. Pipeline auto-handles different formats, removes duplicates, fills missing values — clean data in minutes.',
        },
      },
      {
        number: '02',
        title: { vi: 'Enrichment & scoring tự động', en: 'Automatic enrichment & scoring' },
        desc: {
          vi: 'Hệ thống bổ sung thông tin từ Facebook/Google, tính điểm theo 20+ tín hiệu, và phân nhóm bằng AI clustering. Hoàn toàn tự động, không cần giám sát.',
          en: 'System supplements info from Facebook/Google, scores using 20+ signals, and segments using AI clustering. Fully automatic, no supervision needed.',
        },
      },
      {
        number: '03',
        title: { vi: 'Sales nhận danh sách ưu tiên', en: 'Sales receives priority list' },
        desc: {
          vi: 'Đội sales thấy danh sách lead đã được sắp xếp từ cao xuống thấp theo điểm. Gọi top 20% trước — tỷ lệ deal tăng đáng kể.',
          en: 'Sales team sees leads sorted highest to lowest score. Call the top 20% first — deal rate increases significantly.',
        },
      },
    ],
    results: [
      { metric: '3×', label: { vi: 'tỷ lệ chuyển đổi cao hơn', en: 'higher conversion rate' } },
      { metric: '60%', label: { vi: 'ít thời gian lọc lead hơn', en: 'less time qualifying leads' } },
      { metric: '20+', label: { vi: 'tín hiệu chấm điểm', en: 'scoring signals' } },
    ],
    faq: [
      {
        q: { vi: 'Cần tối thiểu bao nhiêu dữ liệu?', en: 'What is the minimum data required?' },
        a: { vi: 'Tối thiểu 500 records để clustering có ý nghĩa thống kê. Lý tưởng nhất là 2,000+ records — model càng chính xác khi có nhiều data hơn.', en: 'Minimum 500 records for statistically meaningful clustering. Ideal is 2,000+ records — model accuracy improves with more data.' },
      },
      {
        q: { vi: 'Có vi phạm chính sách Facebook không?', en: 'Does this violate Facebook policies?' },
        a: { vi: 'Pipeline chỉ dùng dữ liệu bạn có quyền hợp pháp (leads từ form của bạn, CRM của bạn). Enrichment chỉ đọc thông tin công khai theo đúng ToS.', en: 'The pipeline only uses data you have legal rights to (your own form leads, your CRM). Enrichment only reads public information per ToS.' },
      },
    ],
  },

  'web-fleet': {
    tagline: {
      vi: 'Sự cố website lúc 3 giờ sáng? Bạn biết trước khi khách hàng biết',
      en: 'Website down at 3am? You know before your customers do',
    },
    heroDesc: {
      vi: 'Bạn đang quản lý nhiều website nhưng không biết cái nào đang gặp vấn đề? Web Fleet là một dashboard kiểm soát toàn bộ hạ tầng web: uptime, bảo mật, hiệu suất, SSL. Sự cố xảy ra — bạn nhận Telegram alert trong vòng 1 phút.',
      en: 'Managing multiple websites but not sure which one has issues? Web Fleet is one dashboard controlling your entire web infrastructure: uptime, security, performance, SSL. An incident happens — you get a Telegram alert within 1 minute.',
    },
    painPoints: [
      { icon: '🚨', text: { vi: 'Website down 2 tiếng mới biết vì không có ai monitor 24/7', en: 'Site down for 2 hours before anyone noticed — no 24/7 monitoring' } },
      { icon: '📉', text: { vi: 'Không biết trang nào chậm, trang nào đang làm khách thoát', en: 'No idea which pages are slow or causing user drop-off' } },
      { icon: '🗂️', text: { vi: 'Quản lý 10+ website nhưng phải đăng nhập từng cái một để kiểm tra', en: 'Managing 10+ sites requires logging into each one individually' } },
    ],
    features: [
      {
        icon: '🔴',
        title: { vi: 'Uptime monitoring mỗi 60 giây', en: 'Uptime monitoring every 60 seconds' },
        desc: {
          vi: 'Ping website mỗi phút. Downtime detect ngay lập tức. Alert qua Telegram kèm thông tin lỗi chi tiết — không mất cả ngày mới biết website chết.',
          en: 'Pings websites every minute. Downtime detected instantly. Telegram alert with detailed error info — you don\'t lose an entire day not knowing your site is down.',
        },
      },
      {
        icon: '🛡️',
        title: { vi: 'SSL & Security audit tự động', en: 'Automatic SSL & Security audit' },
        desc: {
          vi: 'Theo dõi ngày hết hạn SSL, cảnh báo trước 30 ngày. Scan security headers, phát hiện mixed content, cấu hình HTTPS không an toàn.',
          en: 'Tracks SSL expiry, warns 30 days in advance. Scans security headers, detects mixed content, insecure HTTPS configurations.',
        },
      },
      {
        icon: '⚡',
        title: { vi: 'PageSpeed & Core Web Vitals', en: 'PageSpeed & Core Web Vitals' },
        desc: {
          vi: 'Tích hợp Google PageSpeed API, theo dõi LCP, FID, CLS theo thời gian. Biết ngay sau lần deploy nào mà website chậm đi.',
          en: 'Google PageSpeed API integration, tracks LCP, FID, CLS over time. Know exactly which deployment slowed down your website.',
        },
      },
      {
        icon: '🤖',
        title: { vi: 'AI Assistant phân tích vấn đề', en: 'AI Assistant analyzes issues' },
        desc: {
          vi: 'Hỏi Gemini AI về bất kỳ vấn đề nào: "Tại sao PageSpeed giảm sau lần deploy hôm qua?" — AI phân tích data và đề xuất giải pháp cụ thể.',
          en: 'Ask Gemini AI about any issue: "Why did PageSpeed drop after yesterday\'s deploy?" — AI analyzes data and proposes specific solutions.',
        },
      },
      {
        icon: '🔑',
        title: { vi: 'Credential Vault mã hóa', en: 'Encrypted Credential Vault' },
        desc: {
          vi: 'Lưu mật khẩu, API keys, FTP credentials cho tất cả website trong một nơi mã hóa an toàn. Không cần dùng sticky note hay notepad nữa.',
          en: 'Store passwords, API keys, FTP credentials for all websites in one secure encrypted vault. No more sticky notes or unprotected notepads.',
        },
      },
      {
        icon: '📈',
        title: { vi: 'GitHub Deploy tracking', en: 'GitHub Deploy tracking' },
        desc: {
          vi: 'Kết nối GitHub Webhooks để tự động log mỗi lần deploy. So sánh performance trước/sau — biết ngay commit nào làm chậm production.',
          en: 'Connect GitHub Webhooks to auto-log every deploy. Compare before/after performance — know exactly which commit slowed production.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Thêm website bằng URL', en: 'Add websites by URL' },
        desc: {
          vi: 'Paste URL của website. Hệ thống tự cấu hình monitoring phù hợp: loại check, tần suất, threshold cảnh báo. Mất 2 phút để thêm một website mới.',
          en: 'Paste your website URL. The system auto-configures appropriate monitoring: check types, frequency, alert thresholds. Takes 2 minutes to add a new website.',
        },
      },
      {
        number: '02',
        title: { vi: 'Dashboard tổng hợp tất cả', en: 'Dashboard aggregates everything' },
        desc: {
          vi: 'Một màn hình hiển thị health score, uptime 30 ngày, response time trend, trạng thái SSL, và PageSpeed cho toàn bộ website cùng lúc.',
          en: 'One screen shows health score, 30-day uptime, response time trend, SSL status, and PageSpeed for all websites simultaneously.',
        },
      },
      {
        number: '03',
        title: { vi: 'Alert → Diagnose → Fix nhanh hơn', en: 'Alert → Diagnose → Fix faster' },
        desc: {
          vi: 'Khi có sự cố, Telegram alert ngay lập tức kèm context đầy đủ. Mở dashboard, hỏi AI assistant, nhận đề xuất fix. Giải quyết vấn đề nhanh hơn 5× so với debug mù.',
          en: 'When an incident occurs, instant Telegram alert with full context. Open dashboard, ask AI assistant, receive fix suggestions. Resolve issues 5× faster than blind debugging.',
        },
      },
    ],
    results: [
      { metric: '99.8%', label: { vi: 'uptime trung bình khách hàng', en: 'average customer uptime' } },
      { metric: '<1 min', label: { vi: 'phát hiện sự cố', en: 'incident detection' } },
      { metric: '18', label: { vi: 'module quản lý tích hợp', en: 'integrated management modules' } },
    ],
    faq: [
      {
        q: { vi: 'Hỗ trợ bao nhiêu website cùng lúc?', en: 'How many websites can it monitor simultaneously?' },
        a: { vi: 'Không giới hạn về mặt phần mềm. Giới hạn thực tế phụ thuộc VPS của bạn. Thông thường VPS 2GB RAM chạy tốt cho 100+ website.', en: 'No software limits. Practical limit depends on your VPS. Typically a 2GB RAM VPS runs well for 100+ websites.' },
      },
      {
        q: { vi: 'Dữ liệu monitoring được lưu bao lâu?', en: 'How long is monitoring data retained?' },
        a: { vi: 'Mặc định 90 ngày. Có thể cấu hình lên đến 1 năm. Dữ liệu lưu local trên server của bạn — hoàn toàn riêng tư.', en: 'Default 90 days. Configurable up to 1 year. Data stored locally on your server — completely private.' },
      },
    ],
  },

  'taomeettrap': {
    tagline: {
      vi: 'Kênh YouTube tự upload video mỗi ngày — bạn không cần chạm tay',
      en: 'A YouTube channel that uploads daily — without you touching anything',
    },
    heroDesc: {
      vi: 'Tạo nội dung YouTube đều đặn đòi hỏi rất nhiều thời gian và công sức. TaoMeetsTrap là pipeline AI 7 bước hoàn toàn tự động: từ ý tưởng → viết lời → tạo nhạc → dựng hình → ghép video → upload → tối ưu SEO. Chạy mỗi ngày, không cần bạn có mặt.',
      en: 'Creating consistent YouTube content takes enormous time and effort. TaoMeetsTrap is a 7-step fully automated AI pipeline: from idea → write lyrics → generate music → create visuals → assemble video → upload → SEO optimize. Runs daily, no presence required.',
    },
    painPoints: [
      { icon: '🎬', text: { vi: 'Làm một video mất 2-3 ngày: quay, dựng, lồng tiếng, chỉnh màu', en: 'One video takes 2-3 days: filming, editing, voiceover, color grading' } },
      { icon: '💰', text: { vi: 'Thuê editor freelance tốn 500k–2 triệu đồng mỗi video', en: 'Hiring a freelance editor costs 500k–2M VND per video' } },
      { icon: '📱', text: { vi: 'Cần đăng đều đặn mỗi ngày nhưng không có đủ nội dung video', en: 'Need to post daily but never have enough video content ready' } },
    ],
    features: [
      {
        icon: '✍️',
        title: { vi: 'GPT-4o: Viết lyrics tự động', en: 'GPT-4o: Auto-write lyrics' },
        desc: {
          vi: 'Mỗi ngày hệ thống chọn theme từ 100+ chủ đề (cuộc sống, tình yêu, đường phố...) và GPT-4o viết lời nhạc Việt theo phong cách trap/hip-hop phù hợp với xu hướng.',
          en: 'Each day the system picks a theme from 100+ topics (life, love, street...) and GPT-4o writes Vietnamese trap/hip-hop lyrics aligned with current trends.',
        },
      },
      {
        icon: '🎵',
        title: { vi: 'Suno: Nhạc chất lượng cao trong 60 giây', en: 'Suno: High-quality music in 60 seconds' },
        desc: {
          vi: 'Suno API nhận lyrics và style tags, tạo bản nhạc hoàn chỉnh với vocal, beat, mix. Chất lượng đủ để upload thương mại — không phải nhạc nền fake.',
          en: 'Suno API receives lyrics and style tags, creates a complete track with vocals, beat, mix. Commercial upload quality — not fake background music.',
        },
      },
      {
        icon: '🎨',
        title: { vi: 'Imagen 3: Hình ảnh cinematic tự động', en: 'Imagen 3: Automatic cinematic visuals' },
        desc: {
          vi: 'Gemini Imagen 3 tạo 8–12 hình ảnh dark neon aesthetic phù hợp với nội dung lyrics. Prompt được tạo tự động, không cần bạn nghĩ.',
          en: 'Gemini Imagen 3 creates 8–12 dark neon aesthetic images matching the lyrics content. Prompts are auto-generated — no thinking required from you.',
        },
      },
      {
        icon: '🎬',
        title: { vi: 'ffmpeg: Video production chuẩn YouTube', en: 'ffmpeg: YouTube-ready video production' },
        desc: {
          vi: 'Ken Burns effect trên hình ảnh, transitions mượt mà, sync audio tự động, fade in/out chuẩn. Output MP4 1080p ready-to-upload, không cần chỉnh sửa thêm.',
          en: 'Ken Burns effect on images, smooth transitions, automatic audio sync, standard fade in/out. Output is 1080p MP4 upload-ready, no additional editing needed.',
        },
      },
      {
        icon: '📤',
        title: { vi: 'YouTube API: Upload + SEO tự động', en: 'YouTube API: Auto-upload + SEO' },
        desc: {
          vi: 'OAuth authentication với kênh YouTube của bạn. Tự viết title, description, tags tối ưu SEO dựa trên nội dung. Chọn thumbnail tốt nhất từ hình ảnh đã tạo.',
          en: 'OAuth authentication with your YouTube channel. Auto-writes SEO-optimized title, description, tags based on content. Selects the best thumbnail from generated images.',
        },
      },
      {
        icon: '🗓️',
        title: { vi: 'Scheduler: Chạy đúng giờ mỗi ngày', en: 'Scheduler: Runs on time every day' },
        desc: {
          vi: 'Cron job chạy tự động vào giờ bạn chọn (ví dụ: 6am mỗi ngày). Email/Telegram notification khi hoàn thành hoặc có lỗi. Lịch sử đầy đủ mọi lần chạy.',
          en: 'Cron job runs automatically at your chosen time (e.g., 6am daily). Email/Telegram notification on completion or error. Full history of every run.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Setup một lần (30 phút)', en: 'One-time setup (30 minutes)' },
        desc: {
          vi: 'Cấu hình API keys (GPT-4o, Suno, Gemini), chọn style nhạc và visual aesthetic, kết nối kênh YouTube. Sau đó hệ thống tự chạy mãi mãi.',
          en: 'Configure API keys (GPT-4o, Suno, Gemini), choose music style and visual aesthetic, connect YouTube channel. Then the system runs forever on its own.',
        },
      },
      {
        number: '02',
        title: { vi: 'Pipeline chạy tự động mỗi ngày', en: 'Pipeline runs automatically daily' },
        desc: {
          vi: 'Đúng giờ đã đặt: theme → lyrics → music → visuals → video → upload. Toàn bộ quy trình hoàn thành trong 15–20 phút. Bạn chỉ nhận notification khi xong.',
          en: 'At your scheduled time: theme → lyrics → music → visuals → video → upload. Entire process completes in 15–20 minutes. You only receive a notification when done.',
        },
      },
      {
        number: '03',
        title: { vi: 'Kênh tăng trưởng không cần bạn', en: 'Channel grows without you' },
        desc: {
          vi: 'Upload đều đặn mỗi ngày là yếu tố then chốt thuật toán YouTube. Kênh tự nhiên tăng subscriber, view. Bạn chỉ cần check analytics mỗi tuần.',
          en: 'Consistent daily uploads are key to YouTube\'s algorithm. Channel naturally grows subscribers and views. You only need to check analytics weekly.',
        },
      },
    ],
    results: [
      { metric: '365', label: { vi: 'video/năm có thể tạo', en: 'videos/year possible' } },
      { metric: '15 min', label: { vi: 'từ trigger đến upload xong', en: 'from trigger to upload complete' } },
      { metric: '$1.50', label: { vi: 'chi phí tối đa mỗi video', en: 'max cost per video' } },
    ],
    faq: [
      {
        q: { vi: 'Chi phí API cho mỗi video là bao nhiêu?', en: 'What are API costs per video?' },
        a: { vi: 'Khoảng $0.50–1.50 mỗi video (GPT-4o ~$0.10, Suno ~$1.00, Imagen 3 ~$0.30). Chi phí một tháng khoảng $20–45 cho 30 video.', en: 'About $0.50–1.50 per video (GPT-4o ~$0.10, Suno ~$1.00, Imagen 3 ~$0.30). Monthly cost around $20–45 for 30 videos.' },
      },
      {
        q: { vi: 'Nhạc Suno có bị copyright YouTube không?', en: 'Does Suno music get copyright-claimed on YouTube?' },
        a: { vi: 'Suno Pro plan cấp phép thương mại đầy đủ. Các kênh dùng Suno thường không bị Content ID. Nên đọc kỹ ToS Suno để nắm rõ điều khoản.', en: 'Suno Pro plan grants full commercial license. Channels using Suno typically aren\'t Content ID claimed. Read Suno ToS carefully to understand terms.' },
      },
    ],
  },

  'crm': {
    tagline: {
      vi: 'CRM doanh nghiệp không cần IT, không cần server riêng',
      en: 'Enterprise CRM with no IT team, no dedicated server',
    },
    heroDesc: {
      vi: 'Deal bị bỏ sót vì quên follow-up? Không biết sales đang ở đâu trong pipeline? CRM v6.0 là hệ thống quản lý khách hàng đầy đủ tính năng, chạy ngay trên Google Sheets mà bạn đã có — không cần mua thêm phần mềm, không cần IT setup. Nâng cấp lên PostgreSQL khi cần scale.',
      en: 'Missing deals because you forgot to follow up? Not sure where sales are in the pipeline? CRM v6.0 is a full-featured customer management system running directly on Google Sheets you already have — no software purchases, no IT setup. Scale up to PostgreSQL when needed.',
    },
    painPoints: [
      { icon: '📋', text: { vi: 'Thông tin khách hàng nằm trong đầu nhân viên, không có chỗ lưu thống nhất', en: 'Customer info lives in staff heads with no unified system' } },
      { icon: '🔄', text: { vi: 'Nhân viên nghỉ việc là mất toàn bộ lịch sử chăm sóc khách hàng', en: 'When staff leave, all customer history walks out with them' } },
      { icon: '📞', text: { vi: 'Không biết khách nào đang cần follow-up, khách nào sắp chốt deal', en: 'No way to know which leads need follow-up or are close to closing' } },
    ],
    features: [
      {
        icon: '🔀',
        title: { vi: 'Visual Pipeline kéo-thả', en: 'Drag-and-drop Visual Pipeline' },
        desc: {
          vi: 'Kanban board hiển thị từng deal theo stage: Lead → Qualified → Proposal → Won/Lost. Kéo thả để cập nhật trạng thái. Nhìn một cái biết ngay cả team đang làm gì.',
          en: 'Kanban board shows each deal by stage: Lead → Qualified → Proposal → Won/Lost. Drag to update status. One look tells you what the entire team is doing.',
        },
      },
      {
        icon: '🔔',
        title: { vi: 'Auto Reminder không bỏ sót deal nào', en: 'Auto Reminder — never miss a deal' },
        desc: {
          vi: 'Đặt ngày follow-up cho từng deal. Hệ thống tự gửi nhắc nhở qua email/Telegram trước 24h. Không còn deal "ngủ quên" vì bận quên theo dõi.',
          en: 'Set follow-up dates for each deal. System auto-sends reminders via email/Telegram 24h in advance. No more deals "sleeping" because you were busy and forgot to follow up.',
        },
      },
      {
        icon: '📊',
        title: { vi: 'Báo cáo realtime tự cập nhật', en: 'Real-time self-updating reports' },
        desc: {
          vi: 'Dashboard tự tính Win Rate, tổng doanh thu pipeline, trung bình thời gian đóng deal, conversion rate theo từng stage. Không cần tự làm báo cáo.',
          en: 'Dashboard auto-calculates Win Rate, total pipeline revenue, average deal close time, conversion rate by stage. No need to manually create reports.',
        },
      },
      {
        icon: '👥',
        title: { vi: 'Phân quyền theo vai trò (RBAC)', en: 'Role-based access control (RBAC)' },
        desc: {
          vi: 'Admin thấy tất cả. Sales chỉ thấy deal của mình. Manager thấy team. Dữ liệu nhạy cảm được bảo vệ mà không cần viết code phân quyền phức tạp.',
          en: 'Admin sees everything. Sales only sees their own deals. Manager sees the team. Sensitive data is protected without complex permission code.',
        },
      },
      {
        icon: '🔄',
        title: { vi: 'Google Sheets hoặc PostgreSQL', en: 'Google Sheets or PostgreSQL' },
        desc: {
          vi: 'Bắt đầu với Google Sheets ngay hôm nay — zero cost, zero setup. Khi team lớn hơn, migrate sang NestJS + PostgreSQL với một lệnh. Không mất dữ liệu.',
          en: 'Start with Google Sheets today — zero cost, zero setup. When your team grows, migrate to NestJS + PostgreSQL with one command. No data loss.',
        },
      },
      {
        icon: '📱',
        title: { vi: 'Mobile-friendly, dùng điện thoại được', en: 'Mobile-friendly, works on phone' },
        desc: {
          vi: 'Sales thường xuyên gặp khách ngoài văn phòng. CRM responsive hoàn toàn — cập nhật deal, thêm ghi chú, xem pipeline ngay trên điện thoại.',
          en: 'Sales are often meeting clients outside the office. CRM is fully responsive — update deals, add notes, view pipeline directly on mobile.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Cài đặt trong 15 phút', en: 'Set up in 15 minutes' },
        desc: {
          vi: 'Copy template Google Sheets vào Drive của bạn, chạy script cài đặt, cấu hình email/Telegram. Không cần server, không cần IT. Toàn team dùng được ngay.',
          en: 'Copy the Google Sheets template to your Drive, run the setup script, configure email/Telegram. No server, no IT needed. Whole team can use it immediately.',
        },
      },
      {
        number: '02',
        title: { vi: 'Nhập deal và theo dõi hàng ngày', en: 'Add deals and track daily' },
        desc: {
          vi: 'Sales thêm deal mới, cập nhật stage, ghi chú cuộc họp. Manager xem dashboard tổng thể. Mọi người thấy đúng thứ mình cần thấy — không hơn, không kém.',
          en: 'Sales adds new deals, updates stages, notes meetings. Manager views the overall dashboard. Everyone sees exactly what they need — nothing more, nothing less.',
        },
      },
      {
        number: '03',
        title: { vi: 'Hệ thống tự nhắc, tự báo cáo', en: 'System auto-reminds, auto-reports' },
        desc: {
          vi: 'Không cần ai phải nhớ gửi báo cáo hay nhắc follow-up. CRM tự làm hết. Team tập trung bán hàng, không bị mất thời gian vào admin.',
          en: 'No one needs to remember to send reports or remind follow-ups. CRM does it all automatically. Team focuses on selling, not wasting time on admin.',
        },
      },
    ],
    results: [
      { metric: '40%', label: { vi: 'ít deal bị bỏ sót hơn', en: 'fewer missed deals' } },
      { metric: '15 min', label: { vi: 'setup xong sẵn dùng', en: 'setup to ready state' } },
      { metric: '$0', label: { vi: 'chi phí phần mềm bổ sung', en: 'additional software cost' } },
    ],
    faq: [
      {
        q: { vi: 'Khác gì với Salesforce hay HubSpot?', en: 'How is this different from Salesforce or HubSpot?' },
        a: { vi: 'Salesforce/HubSpot tốt nhưng tốn $50–150/user/tháng và mất tuần để setup. CRM v6.0 chạy trên Google Sheets, setup 15 phút, chi phí $0. Phù hợp cho team 2–50 người.', en: 'Salesforce/HubSpot are great but cost $50–150/user/month and take weeks to set up. CRM v6.0 runs on Google Sheets, 15-minute setup, $0 cost. Perfect for teams of 2–50 people.' },
      },
      {
        q: { vi: 'Khi nào nên nâng cấp lên PostgreSQL?', en: 'When should I upgrade to PostgreSQL?' },
        a: { vi: 'Khi team vượt 20 người hoặc database vượt 50,000 records. Migration được hỗ trợ hoàn toàn, không mất dữ liệu, không downtime.', en: 'When your team exceeds 20 people or database exceeds 50,000 records. Migration is fully supported, no data loss, no downtime.' },
      },
    ],
  },

  'hubspot-auto': {
    tagline: {
      vi: 'Báo cáo HubSpot hàng tuần — viết xong và gửi đi khi bạn còn ngủ',
      en: 'Weekly HubSpot report — written and sent while you sleep',
    },
    heroDesc: {
      vi: 'Mỗi sáng thứ Hai, manager lại yêu cầu báo cáo tuần. Marketing tốn 2–3 tiếng kéo data, làm chart, viết email. Hubspot Auto tự động làm tất cả: kéo data từ HubSpot, tạo biểu đồ, soạn email báo cáo và gửi cho toàn team — mỗi tuần đúng giờ, không cần ai nhớ.',
      en: 'Every Monday morning, the manager requests the weekly report. Marketing wastes 2–3 hours pulling data, making charts, writing emails. Hubspot Auto does it all automatically: pulls HubSpot data, creates charts, composes report email and sends to the whole team — every week on time, without anyone remembering.',
    },
    painPoints: [
      { icon: '🕐', text: { vi: 'Mất 2–3 giờ mỗi tuần kéo data thủ công và làm báo cáo trong Excel', en: 'Wasting 2–3 hours weekly pulling data manually and building Excel reports' } },
      { icon: '📉', text: { vi: 'Báo cáo gửi trễ hoặc sai số vì làm thủ công dễ nhầm', en: 'Reports sent late or with wrong numbers due to manual errors' } },
      { icon: '🤔', text: { vi: 'Manager không có số liệu kịp thời để ra quyết định tuần này', en: 'Manager lacks timely data to make decisions this week' } },
    ],
    features: [
      {
        icon: '📡',
        title: { vi: 'HubSpot API sync tự động', en: 'Automatic HubSpot API sync' },
        desc: {
          vi: 'Kết nối trực tiếp HubSpot API, tự động kéo deals, contacts, activities trong tuần. Không cần export tay, không cần copy-paste.',
          en: 'Direct HubSpot API connection, automatically pulls deals, contacts, activities from the week. No manual exports, no copy-paste.',
        },
      },
      {
        icon: '📊',
        title: { vi: 'Charts tự động từ data thực', en: 'Automatic charts from real data' },
        desc: {
          vi: 'Chart.js tạo biểu đồ pipeline, deal velocity, conversion funnel từ data HubSpot thực tế. Charts đẹp, chuyên nghiệp, nhúng thẳng vào email.',
          en: 'Chart.js creates pipeline charts, deal velocity, conversion funnel from actual HubSpot data. Beautiful, professional charts, embedded directly in the email.',
        },
      },
      {
        icon: '✉️',
        title: { vi: 'Email báo cáo HTML chuyên nghiệp', en: 'Professional HTML report email' },
        desc: {
          vi: 'Template email HTML responsive với summary tự động, highlight điểm nổi bật, so sánh tuần trước. Trông như báo cáo của cả team marketing làm cả ngày.',
          en: 'Responsive HTML email template with auto-generated summary, key highlights, week-over-week comparison. Looks like a report the whole marketing team worked on all day.',
        },
      },
      {
        icon: '⏰',
        title: { vi: 'Scheduler linh hoạt', en: 'Flexible scheduler' },
        desc: {
          vi: 'Cấu hình chạy bất kỳ ngày giờ nào: hàng ngày, hàng tuần, đầu tháng. Tự chọn ai nhận email trong danh sách distribution list.',
          en: 'Configure to run any day and time: daily, weekly, beginning of month. Choose who receives the email from a distribution list.',
        },
      },
      {
        icon: '📋',
        title: { vi: 'Multiple report templates', en: 'Multiple report templates' },
        desc: {
          vi: 'Template cho Sales Weekly, Marketing Monthly, Executive Summary. Mỗi template tập trung vào metrics phù hợp với từng đối tượng người đọc.',
          en: 'Templates for Sales Weekly, Marketing Monthly, Executive Summary. Each template focuses on metrics appropriate for its audience.',
        },
      },
      {
        icon: '🔔',
        title: { vi: 'Alert bất thường tức thì', en: 'Instant anomaly alerts' },
        desc: {
          vi: 'Nếu metric giảm đột ngột (conversion rate giảm >20%, deals stuck >7 ngày), gửi alert ngay qua Slack/Telegram — không chờ đến cuối tuần mới biết.',
          en: 'If a metric drops suddenly (conversion rate drops >20%, deals stuck >7 days), send immediate alert via Slack/Telegram — no waiting until end of week to find out.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Kết nối HubSpot & cấu hình', en: 'Connect HubSpot & configure' },
        desc: {
          vi: 'Nhập HubSpot API key, chọn template báo cáo, cấu hình danh sách email nhận. Setup mất 20 phút. Báo cáo đầu tiên chạy tự động theo lịch đã đặt.',
          en: 'Enter HubSpot API key, choose report template, configure recipient email list. Setup takes 20 minutes. First report runs automatically on the scheduled time.',
        },
      },
      {
        number: '02',
        title: { vi: 'Scheduler kéo data & tạo report', en: 'Scheduler pulls data & creates report' },
        desc: {
          vi: 'Đúng giờ đã đặt, hệ thống kéo data HubSpot, chạy analytics, tạo charts, soạn email HTML. Toàn bộ quy trình hoàn thành trong 3–5 phút.',
          en: 'At the scheduled time, system pulls HubSpot data, runs analytics, creates charts, composes HTML email. Entire process completes in 3–5 minutes.',
        },
      },
      {
        number: '03',
        title: { vi: 'Team nhận báo cáo sẵn sàng đọc', en: 'Team receives ready-to-read report' },
        desc: {
          vi: 'Nodemailer gửi email đến distribution list. Mọi người mở email thấy báo cáo đẹp với charts và insights. Không ai phải hỏi "báo cáo đâu rồi?".',
          en: 'Nodemailer sends email to the distribution list. Everyone opens the email to see a beautiful report with charts and insights. No one has to ask "where\'s the report?".',
        },
      },
    ],
    results: [
      { metric: '3h', label: { vi: 'tiết kiệm mỗi tuần', en: 'saved per week' } },
      { metric: '100%', label: { vi: 'đúng giờ không trễ', en: 'on-time delivery' } },
      { metric: '0', label: { vi: 'lần quên báo cáo', en: 'missed reports' } },
    ],
    faq: [
      {
        q: { vi: 'Cần quyền gì trong HubSpot?', en: 'What HubSpot permissions are needed?' },
        a: { vi: 'Cần HubSpot Private App với read access cho Contacts, Deals, và Activities. Không cần quyền write — chỉ đọc data để tạo báo cáo.', en: 'Need a HubSpot Private App with read access for Contacts, Deals, and Activities. No write permissions needed — only reads data to create reports.' },
      },
      {
        q: { vi: 'Có thể custom template báo cáo không?', en: 'Can I customize the report template?' },
        a: { vi: 'Có. Template là file HTML+Handlebars có thể chỉnh sửa hoàn toàn. Thêm metrics, thay màu theo brand, điều chỉnh layout theo nhu cầu.', en: 'Yes. The template is an HTML+Handlebars file that is fully editable. Add metrics, change brand colors, adjust layout as needed.' },
      },
    ],
  },

  'arcso': {
    tagline: {
      vi: 'Quản lý 50 tài khoản Facebook & Gmail như quản lý 1',
      en: 'Manage 50 Facebook & Gmail accounts like managing 1',
    },
    heroDesc: {
      vi: 'Bạn đang mở 20 cửa sổ Chrome để quản lý tài khoản? Nhầm tài khoản khi post? Mất account vì dùng chung IP? ArcSo là desktop app giúp quản lý đa tài khoản Facebook và Gmail từ một nơi: phiên làm việc độc lập, profile riêng biệt, không bao giờ nhầm lẫn.',
      en: 'Opening 20 Chrome windows to manage accounts? Posting from the wrong account? Losing accounts because of shared IPs? ArcSo is a desktop app for managing multiple Facebook and Gmail accounts in one place: independent sessions, separate profiles, never mix them up again.',
    },
    painPoints: [
      { icon: '📁', text: { vi: 'Mở 20 tab Chrome để quản lý tài khoản, dễ nhầm lẫn và bị ban', en: 'Opening 20 Chrome tabs to manage accounts — easy to mix up and get banned' } },
      { icon: '⚠️', text: { vi: 'Tài khoản bị ban đột ngột vì dùng chung IP hoặc browser fingerprint', en: 'Accounts banned suddenly due to shared IPs or browser fingerprints' } },
      { icon: '🔐', text: { vi: 'Không kiểm soát được quyền truy cập khi nhiều người dùng chung tài khoản', en: 'No access control when multiple people share the same account' } },
    ],
    features: [
      {
        icon: '🗂️',
        title: { vi: 'Phiên làm việc hoàn toàn độc lập', en: 'Completely independent sessions' },
        desc: {
          vi: 'Mỗi tài khoản chạy trong container riêng biệt — cookies, localStorage, fingerprint hoàn toàn tách biệt. Facebook/Google không thể liên kết các tài khoản với nhau.',
          en: 'Each account runs in its own container — cookies, localStorage, fingerprint completely separate. Facebook/Google cannot link accounts together.',
        },
      },
      {
        icon: '📋',
        title: { vi: 'Import hàng loạt từ CSV', en: 'Bulk import from CSV' },
        desc: {
          vi: 'Import 100 tài khoản chỉ bằng một file CSV. Format đơn giản: username, password, proxy (tùy chọn). Không cần thêm từng cái một.',
          en: 'Import 100 accounts with just one CSV file. Simple format: username, password, proxy (optional). No need to add them one by one.',
        },
      },
      {
        icon: '💾',
        title: { vi: 'Auto-backup phiên làm việc', en: 'Auto-backup sessions' },
        desc: {
          vi: 'Tự động backup toàn bộ session data mỗi ngày. Nếu máy tính gặp sự cố, restore lại tất cả tài khoản trong vài phút — không mất login state.',
          en: 'Automatically backs up all session data daily. If your computer has an issue, restore all accounts in minutes — no lost login state.',
        },
      },
      {
        icon: '🔄',
        title: { vi: 'TanStack Query: Sync realtime', en: 'TanStack Query: Real-time sync' },
        desc: {
          vi: 'Trạng thái mỗi tài khoản (online/offline/error) cập nhật realtime trên dashboard. Biết ngay tài khoản nào cần attention mà không cần click từng cái.',
          en: 'Each account status (online/offline/error) updates in real-time on the dashboard. Know immediately which accounts need attention without clicking each one.',
        },
      },
      {
        icon: '🎨',
        title: { vi: 'Color-coded visual management', en: 'Color-coded visual management' },
        desc: {
          vi: 'Gán màu, tag, và nhóm cho tài khoản theo mục đích: Marketing, Support, Personal... Tìm đúng tài khoản trong 1 giây dù có 50 cái.',
          en: 'Assign colors, tags, and groups to accounts by purpose: Marketing, Support, Personal... Find the right account in 1 second even with 50 of them.',
        },
      },
      {
        icon: '⚡',
        title: { vi: 'Electron: Chạy native trên Windows/Mac', en: 'Electron: Native on Windows/Mac' },
        desc: {
          vi: 'Desktop app native — không cần internet, không cần server. Khởi động nhanh, chạy mượt, tích hợp system notifications khi có sự kiện quan trọng.',
          en: 'Native desktop app — no internet required, no server needed. Fast startup, smooth operation, system notification integration for important events.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Import tài khoản vào hệ thống', en: 'Import accounts into the system' },
        desc: {
          vi: 'Thêm tài khoản thủ công hoặc import hàng loạt từ CSV. Gán màu và tag để dễ quản lý. Hệ thống tự tạo profile riêng cho từng tài khoản.',
          en: 'Add accounts manually or bulk import from CSV. Assign colors and tags for easy management. System auto-creates a separate profile for each account.',
        },
      },
      {
        number: '02',
        title: { vi: 'Mở tài khoản trong container riêng', en: 'Open accounts in separate containers' },
        desc: {
          vi: 'Click vào tài khoản — mở trong cửa sổ container độc lập. Đồng thời mở nhiều tài khoản song song, mỗi cái hoàn toàn cách ly với nhau.',
          en: 'Click on an account — opens in an independent container window. Open multiple accounts simultaneously, each completely isolated from others.',
        },
      },
      {
        number: '03',
        title: { vi: 'Dashboard quản lý tập trung', en: 'Centralized management dashboard' },
        desc: {
          vi: 'Dashboard hiển thị trạng thái realtime tất cả tài khoản. Biết cái nào đang active, cái nào bị lỗi. Backup và restore từ một chỗ duy nhất.',
          en: 'Dashboard shows real-time status of all accounts. Know which are active, which have errors. Backup and restore from one single place.',
        },
      },
    ],
    results: [
      { metric: '50+', label: { vi: 'tài khoản quản lý đồng thời', en: 'accounts managed simultaneously' } },
      { metric: '0', label: { vi: 'lần nhầm tài khoản', en: 'account mix-ups' } },
      { metric: '5 min', label: { vi: 'restore toàn bộ session', en: 'to restore all sessions' } },
    ],
    faq: [
      {
        q: { vi: 'Có bị Facebook phát hiện và ban không?', en: 'Will Facebook detect and ban accounts?' },
        a: { vi: 'ArcSo dùng container riêng biệt với fingerprint độc lập cho mỗi tài khoản. Kết hợp với proxy riêng cho từng tài khoản sẽ giảm thiểu đáng kể risk bị detect.', en: 'ArcSo uses separate containers with independent fingerprints for each account. Combined with separate proxies for each account significantly minimizes detection risk.' },
      },
      {
        q: { vi: 'Hỗ trợ nền tảng nào ngoài Facebook và Gmail?', en: 'What platforms are supported besides Facebook and Gmail?' },
        a: { vi: 'Về lý thuyết có thể dùng với bất kỳ website nào. Tuy nhiên tính năng tối ưu nhất cho Facebook và Gmail. Các nền tảng khác hoạt động nhưng không có automation đặc biệt.', en: 'Theoretically works with any website. However, features are most optimized for Facebook and Gmail. Other platforms work but without special automation.' },
      },
    ],
  },

  'extensions-suite': {
    tagline: {
      vi: 'Ba công cụ AI ngay trong trình duyệt — không cần mở thêm tab nào',
      en: 'Three AI tools built into your browser — no extra tabs needed',
    },
    heroDesc: {
      vi: 'Bạn đang copy-paste qua lại giữa 5 tab mỗi ngày? Extensions Suite đưa ba công cụ thiết yếu vào thẳng trình duyệt: AI assistant luôn sẵn sàng, quản lý Facebook Ads không cần vào Ads Manager, và auto-repost nội dung đa nền tảng chỉ một click.',
      en: 'Copy-pasting between 5 tabs every day? Extensions Suite brings three essential tools directly into your browser: always-on AI assistant, Facebook Ads management without opening Ads Manager, and one-click multi-platform auto-repost.',
    },
    painPoints: [
      { icon: '🖱️', text: { vi: 'Copy-paste qua lại 5 tab mỗi ngày chỉ để hoàn thành một việc', en: 'Copy-pasting between 5 tabs every day just to complete one task' } },
      { icon: '🧩', text: { vi: 'Cần làm tự động trên browser nhưng không biết lập trình', en: 'Need browser automation but don\'t know how to code' } },
      { icon: '🔗', text: { vi: 'Mỗi công việc cần một extension khác nhau — cài quá nhiều, nặng máy', en: 'Every task needs a different extension — too many installed, browser slows down' } },
    ],
    features: [
      {
        icon: '🤖',
        title: { vi: 'AI Assistant luôn sẵn sàng (Ctrl+Shift+A)', en: 'Always-on AI Assistant (Ctrl+Shift+A)' },
        desc: {
          vi: 'Tổ hợp phím mở AI assistant ngay trên trang bất kỳ. Hỏi về nội dung đang xem, nhờ viết lại đoạn text, dịch, tóm tắt — không cần mở tab ChatGPT mới.',
          en: 'Keyboard shortcut opens AI assistant on any page. Ask about content you\'re viewing, rewrite text, translate, summarize — no need to open a new ChatGPT tab.',
        },
      },
      {
        icon: '📢',
        title: { vi: 'Facebook Ads không cần Ads Manager', en: 'Facebook Ads without Ads Manager' },
        desc: {
          vi: 'Xem và quản lý campaign performance ngay trong sidebar trình duyệt. Tắt/bật ad set, xem spend, ROAS, CTR — không cần đăng nhập vào Ads Manager.',
          en: 'View and manage campaign performance in the browser sidebar. Toggle ad sets on/off, see spend, ROAS, CTR — no need to log into Ads Manager.',
        },
      },
      {
        icon: '🔁',
        title: { vi: 'Auto-repost đa nền tảng', en: 'Multi-platform auto-repost' },
        desc: {
          vi: 'Viết post một lần, click nút — tự động đăng lên Facebook, Instagram, LinkedIn, Twitter cùng lúc. Content calendar tích hợp để lên lịch trước.',
          en: 'Write a post once, click the button — automatically posts to Facebook, Instagram, LinkedIn, Twitter simultaneously. Built-in content calendar for scheduling ahead.',
        },
      },
      {
        icon: '🧩',
        title: { vi: 'Chrome MV3: An toàn, hiệu suất cao', en: 'Chrome MV3: Safe, high performance' },
        desc: {
          vi: 'Xây dựng trên Manifest V3 mới nhất của Chrome — tiêu chuẩn bảo mật cao nhất, ít tốn pin hơn, không làm chậm trình duyệt.',
          en: 'Built on Chrome\'s latest Manifest V3 — highest security standard, lower battery drain, doesn\'t slow down the browser.',
        },
      },
      {
        icon: '🔐',
        title: { vi: 'Dữ liệu lưu local, không cloud', en: 'Data stored locally, not cloud' },
        desc: {
          vi: 'API keys và dữ liệu cá nhân lưu trong Chrome Storage local trên máy bạn. Không có server nào của chúng tôi lưu thông tin tài khoản của bạn.',
          en: 'API keys and personal data stored in Chrome Storage locally on your machine. None of our servers store your account information.',
        },
      },
      {
        icon: '⚡',
        title: { vi: 'Content Scripts: Inject vào mọi trang', en: 'Content Scripts: Inject into any page' },
        desc: {
          vi: 'Extension tự nhận diện ngữ cảnh trang đang xem và hiện tính năng phù hợp. Đang ở Facebook — hiện Ads manager. Đang soạn email — hiện AI writing.',
          en: 'Extension auto-detects the page context and shows relevant features. On Facebook — show Ads manager. Composing email — show AI writing assistant.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Cài từ Chrome Web Store', en: 'Install from Chrome Web Store' },
        desc: {
          vi: 'Một click cài đặt. Nhập API key (Claude/GPT-4o) và Facebook Ads token nếu dùng tính năng quảng cáo. Xong — extension sẵn sàng trên mọi trang.',
          en: 'One-click install. Enter API key (Claude/GPT-4o) and Facebook Ads token if using ad features. Done — extension is ready on every page.',
        },
      },
      {
        number: '02',
        title: { vi: 'Dùng ngay trên trang đang xem', en: 'Use directly on your current page' },
        desc: {
          vi: 'Không cần chuyển tab. Ctrl+Shift+A để hỏi AI. Click icon extension để xem Ads stats. Nút "Repost" hiện trên Facebook khi chọn nội dung.',
          en: 'No tab switching needed. Ctrl+Shift+A to ask AI. Click extension icon to see Ads stats. "Repost" button appears on Facebook when content is selected.',
        },
      },
      {
        number: '03',
        title: { vi: 'Workflow nhanh hơn, ít tab hơn', en: 'Faster workflow, fewer tabs' },
        desc: {
          vi: 'Người dùng báo cáo giảm từ 8 tab xuống 3 tab làm việc hàng ngày. Thời gian xử lý task giảm 40% vì không phải context-switch liên tục.',
          en: 'Users report reducing from 8 tabs to 3 tabs in daily work. Task processing time reduced 40% because of eliminating constant context-switching.',
        },
      },
    ],
    results: [
      { metric: '3', label: { vi: 'extension trong một bộ', en: 'extensions in one suite' } },
      { metric: '40%', label: { vi: 'ít thời gian context-switch', en: 'less context-switching time' } },
      { metric: '1 click', label: { vi: 'repost đa nền tảng', en: 'multi-platform repost' } },
    ],
    faq: [
      {
        q: { vi: 'Extension có hoạt động trên Edge/Firefox không?', en: 'Does the extension work on Edge/Firefox?' },
        a: { vi: 'Hiện tại chỉ hỗ trợ Chrome và Chromium-based browsers (Edge, Brave, Arc). Firefox dùng API khác, chưa có kế hoạch hỗ trợ.', en: 'Currently supports Chrome and Chromium-based browsers (Edge, Brave, Arc) only. Firefox uses different APIs, no support planned.' },
      },
      {
        q: { vi: 'Facebook Ads token có an toàn không?', en: 'Is the Facebook Ads token secure?' },
        a: { vi: 'Token được mã hóa và lưu trong Chrome Storage — chỉ extension của bạn đọc được. Không đi qua bất kỳ server trung gian nào.', en: 'Token is encrypted and stored in Chrome Storage — only your extension can read it. Does not pass through any intermediate servers.' },
      },
    ],
  },

  'dms': {
    tagline: {
      vi: 'Hồ sơ không còn thất lạc, phê duyệt không còn chờ đợi hàng tuần',
      en: 'No more lost files, no more weeks-long approval waits',
    },
    heroDesc: {
      vi: 'Phòng ban của bạn đang lưu hồ sơ trong email, Google Drive cá nhân, USB? Không ai biết phiên bản nào mới nhất? DMS Pro là hệ thống quản lý tài liệu nội bộ trên Google Workspace: phân quyền theo phòng ban, quy trình duyệt một click, AI tự gắn tag và nhắc hết hạn.',
      en: 'Your department storing files in email, personal Google Drive, USB drives? No one knows which version is newest? DMS Pro is an internal document management system on Google Workspace: department-level permissions, one-click approval workflows, AI auto-tagging and expiry reminders.',
    },
    painPoints: [
      { icon: '📂', text: { vi: 'File nằm rải rác trong email, Drive cá nhân, USB — không ai tìm nhanh được', en: 'Files scattered in email, personal Drive, USB — no one can find things quickly' } },
      { icon: '✍️', text: { vi: 'Không có quy trình duyệt, tài liệu quan trọng bị bỏ sót không ai ký', en: 'No approval process — critical documents get missed or left unsigned' } },
      { icon: '🔒', text: { vi: 'Không kiểm soát được ai đang xem hay chỉnh sửa tài liệu nội bộ', en: 'No control over who is viewing or editing internal documents' } },
    ],
    features: [
      {
        icon: '🗂️',
        title: { vi: 'Cấu trúc phân cấp theo phòng ban', en: 'Department-level hierarchy structure' },
        desc: {
          vi: 'Tổ chức tài liệu theo phòng ban, dự án, loại hồ sơ. Phân quyền xem/sửa/duyệt theo vai trò — nhân viên chỉ thấy hồ sơ phòng mình, manager thấy tất cả.',
          en: 'Organize documents by department, project, file type. View/edit/approve permissions by role — employees only see their department\'s files, managers see all.',
        },
      },
      {
        icon: '✅',
        title: { vi: 'Quy trình duyệt hồ sơ một click', en: 'One-click document approval workflow' },
        desc: {
          vi: 'Submit hồ sơ → trưởng phòng nhận notification → click Approve/Reject với comment. Toàn bộ lịch sử duyệt được lưu. Không còn email đi vòng vòng xin duyệt.',
          en: 'Submit document → department head receives notification → click Approve/Reject with comment. All approval history saved. No more round-robin emails asking for approval.',
        },
      },
      {
        icon: '🤖',
        title: { vi: 'Gemini AI tự gắn tag thông minh', en: 'Gemini AI automatic smart tagging' },
        desc: {
          vi: 'Upload tài liệu — Gemini AI đọc nội dung, tự gắn tag phù hợp (hợp đồng, báo cáo, hóa đơn...). Tìm kiếm sau này nhanh hơn 10× so với folder thông thường.',
          en: 'Upload a document — Gemini AI reads content, auto-assigns relevant tags (contract, report, invoice...). Future searching is 10× faster than regular folders.',
        },
      },
      {
        icon: '⏰',
        title: { vi: 'Báo cáo hết hạn hàng tuần', en: 'Weekly expiry reports' },
        desc: {
          vi: 'Mỗi tuần hệ thống tự kiểm tra tất cả hồ sơ có ngày hết hạn (hợp đồng, giấy phép...) và gửi báo cáo cho người phụ trách. Không bao giờ để hợp đồng hết hạn không hay.',
          en: 'Each week the system auto-checks all documents with expiry dates (contracts, licenses...) and sends reports to responsible parties. Never let a contract expire unknowingly.',
        },
      },
      {
        icon: '🔍',
        title: { vi: 'Full-text search toàn bộ kho hồ sơ', en: 'Full-text search across entire archive' },
        desc: {
          vi: 'Tìm kiếm theo tên, nội dung, tag, người tạo, ngày tháng. Kết quả xuất hiện trong vài giây dù có 10,000 tài liệu.',
          en: 'Search by name, content, tag, creator, date. Results appear in seconds even with 10,000 documents.',
        },
      },
      {
        icon: '📊',
        title: { vi: 'AppSheet: Giao diện mobile-friendly', en: 'AppSheet: Mobile-friendly interface' },
        desc: {
          vi: 'AppSheet tạo giao diện ứng dụng từ Google Sheets — nhân viên dùng được trên điện thoại ngay lập tức. Không cần cài app, không cần training phức tạp.',
          en: 'AppSheet creates an app interface from Google Sheets — employees use it on phones immediately. No app installation, no complex training needed.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Setup trên Google Workspace của công ty', en: 'Set up on your company Google Workspace' },
        desc: {
          vi: 'Tạo cấu trúc Google Sheets theo phòng ban, chạy Apps Script cài đặt, cấu hình AppSheet. Mất 1 buổi để setup cho toàn công ty. Không cần server.',
          en: 'Create Google Sheets structure by department, run setup Apps Script, configure AppSheet. Takes one session to set up for the whole company. No server needed.',
        },
      },
      {
        number: '02',
        title: { vi: 'Nhân viên upload, AI tự tag', en: 'Employees upload, AI auto-tags' },
        desc: {
          vi: 'Nhân viên upload tài liệu qua form AppSheet. Gemini AI tự đọc và gắn tag. Hồ sơ xuất hiện trong dashboard với metadata đầy đủ, sẵn sàng để tìm kiếm.',
          en: 'Employees upload documents via AppSheet form. Gemini AI auto-reads and tags. Document appears in the dashboard with full metadata, ready to search.',
        },
      },
      {
        number: '03',
        title: { vi: 'Tìm kiếm, duyệt, và theo dõi hết hạn', en: 'Search, approve, and track expiry' },
        desc: {
          vi: 'Tìm hồ sơ bằng full-text search. Submit để duyệt, nhận kết quả trong vài giờ. Hệ thống tự nhắc hết hạn — không cần nhớ thủ công.',
          en: 'Find documents with full-text search. Submit for approval, receive results in hours. System auto-reminds about expiry — no need for manual reminders.',
        },
      },
    ],
    results: [
      { metric: '80%', label: { vi: 'ít thời gian tìm kiếm hồ sơ', en: 'less time searching for documents' } },
      { metric: '0', label: { vi: 'hợp đồng hết hạn bị bỏ sót', en: 'expired contracts missed' } },
      { metric: '1 ngày', label: { vi: 'setup xong cho cả công ty', en: 'to set up for entire company' } },
    ],
    faq: [
      {
        q: { vi: 'Cần mua thêm phần mềm gì không?', en: 'Do I need to purchase additional software?' },
        a: { vi: 'Không. Hệ thống chạy hoàn toàn trên Google Workspace (Drive, Sheets, Apps Script) và AppSheet — những công cụ hầu hết công ty đã có. Chi phí gần như $0.', en: 'No. System runs entirely on Google Workspace (Drive, Sheets, Apps Script) and AppSheet — tools most companies already have. Cost is nearly $0.' },
      },
      {
        q: { vi: 'Có thể migrate hồ sơ cũ vào không?', en: 'Can I migrate existing files into it?' },
        a: { vi: 'Có. Cung cấp script import batch từ Google Drive folder cũ. AI sẽ tự động tag toàn bộ hồ sơ cũ khi import. Thường mất 2–4 giờ cho 1000 tài liệu.', en: 'Yes. Batch import script is provided from old Google Drive folders. AI will automatically tag all old documents on import. Typically takes 2–4 hours for 1,000 documents.' },
      },
    ],
  },

  'video-transcript': {
    tagline: {
      vi: 'Họp 2 tiếng → biên bản đầy đủ với timestamp → trong 10 phút',
      en: '2-hour meeting → complete transcript with timestamps → in 10 minutes',
    },
    heroDesc: {
      vi: 'Đang mất hàng giờ để nghe lại recording và gõ biên bản họp? Hay thuê người transcribe với chi phí cao? VideoKL chuyển đổi video/audio tiếng Việt thành văn bản chính xác với timestamp từng từ — 1 giờ recording xử lý xong trong 5 phút, chi phí $0.06.',
      en: 'Spending hours replaying recordings and typing meeting minutes? Or hiring transcribers at high cost? VideoKL converts Vietnamese video/audio to accurate text with word-level timestamps — 1 hour of recording processed in 5 minutes at $0.06 cost.',
    },
    painPoints: [
      { icon: '🎧', text: { vi: 'Nghe lại toàn bộ meeting 1 tiếng chỉ để tìm 1 quyết định quan trọng', en: 'Re-listening to 1-hour meetings just to find one key decision' } },
      { icon: '🌐', text: { vi: 'Video tiếng Anh hay nhưng không có phụ đề tiếng Việt để team dùng được', en: 'Great English content but no Vietnamese subtitles for your team to use' } },
      { icon: '📝', text: { vi: 'Tốn cả buổi sáng transcribe meeting rồi format lại thành biên bản', en: 'Spending a whole morning transcribing then formatting meeting minutes' } },
    ],
    features: [
      {
        icon: '🎯',
        title: { vi: 'Whisper AI: Chính xác tiếng Việt 95%+', en: 'Whisper AI: 95%+ Vietnamese accuracy' },
        desc: {
          vi: 'OpenAI Whisper large-v3 được fine-tune cho tiếng Việt. Nhận diện chính xác cả giọng miền Nam, miền Bắc, accent và tiếng lóng thông dụng.',
          en: 'OpenAI Whisper large-v3 fine-tuned for Vietnamese. Accurately recognizes Southern, Northern accents, and common slang.',
        },
      },
      {
        icon: '⏱️',
        title: { vi: 'Word-level timestamp từng từ', en: 'Word-level timestamp for every word' },
        desc: {
          vi: 'Mỗi từ trong transcript có timestamp chính xác đến 0.01 giây. Click vào từ bất kỳ để jump đến đúng thời điểm trong video. Tìm kiếm trong nội dung recording siêu nhanh.',
          en: 'Every word in the transcript has a timestamp accurate to 0.01 seconds. Click any word to jump to that exact moment in the video. Ultra-fast search within recording content.',
        },
      },
      {
        icon: '📹',
        title: { vi: 'Hỗ trợ mọi định dạng video/audio', en: 'Supports all video/audio formats' },
        desc: {
          vi: 'ffmpeg xử lý MP4, MOV, AVI, MKV, MP3, WAV, M4A, WebM... Zoom recording, Google Meet, podcast, bài giảng, phỏng vấn — tất cả đều được.',
          en: 'ffmpeg handles MP4, MOV, AVI, MKV, MP3, WAV, M4A, WebM... Zoom recordings, Google Meet, podcasts, lectures, interviews — all supported.',
        },
      },
      {
        icon: '📄',
        title: { vi: 'Export JSON/SRT/TXT linh hoạt', en: 'Flexible JSON/SRT/TXT export' },
        desc: {
          vi: 'JSON với full metadata để tích hợp vào pipeline nội dung. SRT để add subtitle lên video. TXT thuần để đọc và edit. Chọn format phù hợp với workflow của bạn.',
          en: 'JSON with full metadata for content pipeline integration. SRT for adding subtitles to videos. Plain TXT for reading and editing. Choose the format that fits your workflow.',
        },
      },
      {
        icon: '⚡',
        title: { vi: 'Batch processing nhiều file cùng lúc', en: 'Batch processing multiple files' },
        desc: {
          vi: 'Không cần đợi từng file. Queue hàng chục recording, hệ thống tự xử lý tuần tự hoặc song song. Thức dậy — toàn bộ transcript đã xong.',
          en: 'No waiting for individual files. Queue dozens of recordings, system auto-processes sequentially or in parallel. Wake up — all transcripts are done.',
        },
      },
      {
        icon: '🔗',
        title: { vi: 'Tích hợp vào content pipeline', en: 'Integrate into content pipeline' },
        desc: {
          vi: 'API endpoint nhận file, trả về transcript. Tích hợp vào n8n, Zapier, hoặc custom script để tự động hóa quy trình: record → transcript → summary → publish.',
          en: 'API endpoint accepts files, returns transcript. Integrate into n8n, Zapier, or custom scripts to automate the workflow: record → transcript → summary → publish.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Upload video hoặc audio', en: 'Upload video or audio' },
        desc: {
          vi: 'Drag & drop file hoặc dùng CLI. ffmpeg tự extract audio, chuẩn hóa sample rate. Không cần pre-process thủ công.',
          en: 'Drag & drop file or use CLI. ffmpeg auto-extracts audio, normalizes sample rate. No manual pre-processing needed.',
        },
      },
      {
        number: '02',
        title: { vi: 'Whisper AI xử lý và tạo transcript', en: 'Whisper AI processes and creates transcript' },
        desc: {
          vi: 'Whisper large-v3 phân tích audio, nhận diện giọng nói, tạo transcript với timestamp từng từ. 1 giờ audio ≈ 5 phút xử lý trên GPU bình thường.',
          en: 'Whisper large-v3 analyzes audio, recognizes speech, creates transcript with word-level timestamps. 1 hour audio ≈ 5 minutes processing on a regular GPU.',
        },
      },
      {
        number: '03',
        title: { vi: 'Download theo format cần dùng', en: 'Download in the format you need' },
        desc: {
          vi: 'Chọn JSON (cho developer), SRT (cho video subtitle), hoặc TXT (cho editor). Tích hợp API vào pipeline để không cần bước thủ công nào.',
          en: 'Choose JSON (for developers), SRT (for video subtitles), or TXT (for editors). Integrate API into your pipeline to eliminate all manual steps.',
        },
      },
    ],
    results: [
      { metric: '95%+', label: { vi: 'độ chính xác tiếng Việt', en: 'Vietnamese accuracy' } },
      { metric: '12×', label: { vi: 'nhanh hơn real-time', en: 'faster than real-time' } },
      { metric: '$0.06', label: { vi: 'mỗi giờ audio', en: 'per hour of audio' } },
    ],
    faq: [
      {
        q: { vi: 'Cần GPU không? Chạy được trên máy thường không?', en: 'Do I need a GPU? Can it run on a regular machine?' },
        a: { vi: 'GPU giúp nhanh hơn 10× nhưng không bắt buộc. CPU-only cũng chạy được, chỉ chậm hơn: 1 giờ audio mất ~60 phút trên CPU, ~5 phút trên GPU.', en: 'GPU speeds up processing 10× but is not required. CPU-only also works, just slower: 1 hour audio takes ~60 minutes on CPU, ~5 minutes on GPU.' },
      },
      {
        q: { vi: 'Dữ liệu audio có được gửi ra ngoài không?', en: 'Is audio data sent externally?' },
        a: { vi: 'Whisper chạy hoàn toàn local trên máy của bạn. Không có file audio nào được gửi ra internet. Phù hợp với nội dung họp nhạy cảm, bí mật kinh doanh.', en: 'Whisper runs completely locally on your machine. No audio files are sent to the internet. Suitable for sensitive meeting content, business secrets.' },
      },
    ],
  },

  'ads-portal': {
    tagline: {
      vi: 'Toàn bộ Facebook Ads của bạn trong một dashboard — không cần mở Ads Manager',
      en: 'All your Facebook Ads in one dashboard — no Ads Manager needed',
    },
    heroDesc: {
      vi: 'Đang quản lý nhiều tài khoản Facebook Ads cho nhiều khách hàng? Mệt mỏi với việc đăng nhập từng tài khoản một, token hết hạn không báo, không có cái nhìn tổng thể? Ads Portal là API hub tập trung: quản lý tất cả tài khoản, token rotation tự động, analytics realtime từ một nơi.',
      en: 'Managing multiple Facebook Ads accounts for multiple clients? Tired of logging into each one, tokens expiring without warning, no overall view? Ads Portal is a centralized API hub: manage all accounts, automatic token rotation, real-time analytics from one place.',
    },
    painPoints: [
      { icon: '📊', text: { vi: 'Dữ liệu quảng cáo nằm ở nhiều tài khoản khác nhau, không có cái nhìn tổng', en: 'Ad data spread across many accounts with no unified overview' } },
      { icon: '💸', text: { vi: 'Không biết campaign nào đang lỗ, cứ để chạy đến cuối tháng mới hay', en: 'Can\'t tell which campaigns are losing money until end-of-month reports' } },
      { icon: '⏱️', text: { vi: 'Token hết hạn không báo, campaign ngừng chạy mà không ai biết', en: 'Token expires without warning, campaigns stop running without anyone knowing' } },
    ],
    features: [
      {
        icon: '🗂️',
        title: { vi: 'Multi-account: Tất cả trong một nơi', en: 'Multi-account: Everything in one place' },
        desc: {
          vi: 'Thêm tất cả tài khoản Facebook Ads vào một hub duy nhất. Chuyển đổi giữa tài khoản bằng một click. Không bao giờ nhầm đang chạy report của khách hàng nào.',
          en: 'Add all Facebook Ads accounts to a single hub. Switch between accounts with one click. Never confuse which client\'s report you\'re running.',
        },
      },
      {
        icon: '🔄',
        title: { vi: 'Token rotation tự động 24/7', en: 'Automatic token rotation 24/7' },
        desc: {
          vi: 'Facebook access token hết hạn sau 60 ngày. Ads Portal tự detect và refresh trước khi hết hạn. Không bao giờ bị ngắt kết nối giữa chừng vì token cũ.',
          en: 'Facebook access tokens expire after 60 days. Ads Portal auto-detects and refreshes before expiry. Never get disconnected mid-work because of an expired token.',
        },
      },
      {
        icon: '📊',
        title: { vi: 'Analytics realtime mọi campaign', en: 'Real-time analytics for all campaigns' },
        desc: {
          vi: 'Dashboard hiển thị spend, impressions, clicks, CTR, CPC, ROAS cho tất cả campaign cùng lúc. So sánh hiệu suất giữa các tài khoản và chiến dịch trong giây lát.',
          en: 'Dashboard shows spend, impressions, clicks, CTR, CPC, ROAS for all campaigns simultaneously. Compare performance across accounts and campaigns instantly.',
        },
      },
      {
        icon: '🔔',
        title: { vi: 'Budget alert trước khi cạn tiền', en: 'Budget alerts before funds run out' },
        desc: {
          vi: 'Đặt ngưỡng cảnh báo: "Báo tôi khi còn 20% budget". Nhận Telegram notification ngay lập tức. Không bao giờ để campaign tắt vì hết tiền mà không hay.',
          en: 'Set alert thresholds: "Notify me when 20% budget remains." Receive immediate Telegram notification. Never let a campaign stop because funds ran out without warning.',
        },
      },
      {
        icon: '🛡️',
        title: { vi: 'SQLite: Audit log đầy đủ', en: 'SQLite: Complete audit log' },
        desc: {
          vi: 'Mọi thay đổi đều được log: ai thay đổi budget, bật/tắt campaign nào, lúc mấy giờ. Audit trail đầy đủ cho client reporting và internal accountability.',
          en: 'Every change is logged: who changed the budget, which campaign was toggled, at what time. Complete audit trail for client reporting and internal accountability.',
        },
      },
      {
        icon: '⚡',
        title: { vi: 'Express API: Tích hợp vào workflow', en: 'Express API: Integrate into workflows' },
        desc: {
          vi: 'REST API đầy đủ để tích hợp với tools khác: tự động tạo báo cáo, trigger campaign từ CRM, sync data vào Google Sheets. Không bị lock vào một giao diện.',
          en: 'Full REST API for integration with other tools: auto-generate reports, trigger campaigns from CRM, sync data to Google Sheets. Not locked into one interface.',
        },
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: { vi: 'Connect tài khoản Facebook Ads', en: 'Connect Facebook Ads accounts' },
        desc: {
          vi: 'Nhập access token cho từng tài khoản. Hệ thống tự verify quyền truy cập, lấy danh sách campaign và set ngưỡng cảnh báo mặc định.',
          en: 'Enter access token for each account. System auto-verifies access, fetches campaign list, and sets default alert thresholds.',
        },
      },
      {
        number: '02',
        title: { vi: 'Dashboard tổng hợp tức thì', en: 'Instant aggregated dashboard' },
        desc: {
          vi: 'Tất cả analytics tổng hợp về một màn hình: spend hôm nay, campaign đang chạy, budget còn lại, performance trend 7 ngày. Không cần tab nào khác.',
          en: 'All analytics aggregated on one screen: today\'s spend, running campaigns, remaining budget, 7-day performance trend. No other tabs needed.',
        },
      },
      {
        number: '03',
        title: { vi: 'Alert và quản lý từ một nơi', en: 'Alerts and management from one place' },
        desc: {
          vi: 'Nhận alert qua Telegram khi budget gần cạn. Pause/resume campaign trực tiếp từ dashboard. Xuất báo cáo cho client bằng một click.',
          en: 'Receive Telegram alerts when budget is low. Pause/resume campaigns directly from the dashboard. Export client reports with one click.',
        },
      },
    ],
    results: [
      { metric: '∞', label: { vi: 'tài khoản Ads quản lý được', en: 'Ads accounts manageable' } },
      { metric: '0', label: { vi: 'lần token hết hạn không hay', en: 'unexpected token expirations' } },
      { metric: '2h', label: { vi: 'tiết kiệm mỗi ngày cho agency', en: 'saved daily for agencies' } },
    ],
    faq: [
      {
        q: { vi: 'Có vi phạm ToS của Facebook không?', en: 'Does this violate Facebook\'s ToS?' },
        a: { vi: 'Ads Portal sử dụng Facebook Marketing API chính thức. Đây là cách Meta cho phép third-party tools tích hợp. Không dùng scraping hay automation không chính thức.', en: 'Ads Portal uses the official Facebook Marketing API. This is how Meta allows third-party tools to integrate. No scraping or unauthorized automation is used.' },
      },
      {
        q: { vi: 'Ads Portal có thể tự chạy campaign không?', en: 'Can Ads Portal run campaigns automatically?' },
        a: { vi: 'Hiện tại là read + alert + basic controls (pause/resume). Tính năng auto-bidding và rule-based automation đang trong roadmap cho phiên bản tiếp theo.', en: 'Currently supports read + alerts + basic controls (pause/resume). Auto-bidding and rule-based automation features are on the roadmap for the next version.' },
      },
    ],
  },
}

export const minimalDetails: Record<string, ProductDetail> = {}
