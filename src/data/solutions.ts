export interface Solution {
  id: string
  icon: string
  color: string
  industry: { vi: string; en: string }
  headline: { vi: string; en: string }
  pain: { vi: string; en: string }
  fix: { vi: string; en: string }
  outcomes: { vi: string; en: string }[]
  products: string[]
}

export const solutions: Solution[] = [
  {
    id: 'sales',
    icon: '📈',
    color: '#10b981',
    industry: { vi: 'Đội sales & CRM', en: 'Sales & CRM teams' },
    headline: { vi: 'Đóng nhiều deal hơn, làm việc ít hơn', en: 'Close more deals, do less work' },
    pain: {
      vi: 'Sales dành 60% thời gian cập nhật CRM, nhắc nhở thủ công và viết báo cáo. Deals bị bỏ quên vì không có hệ thống.',
      en: 'Sales reps spend 60% of their time updating CRM, sending manual follow-ups and writing reports. Deals get lost without a system.',
    },
    fix: {
      vi: 'CRM tự động nhắc follow-up đúng lúc, báo cáo pipeline tự gửi mỗi tuần, AI phân tích deal nào cần ưu tiên.',
      en: 'CRM auto-reminds follow-ups at the right time, pipeline reports auto-send weekly, AI flags which deals need priority.',
    },
    outcomes: [
      { vi: 'Tiết kiệm 8+ giờ/tuần cho mỗi sales rep', en: 'Save 8+ hours/week per sales rep' },
      { vi: 'Tỷ lệ win tăng 20–35% nhờ follow-up đúng hạn', en: '20–35% higher win rate from timely follow-ups' },
      { vi: 'Không còn deal bị bỏ quên', en: 'Zero deals slipping through the cracks' },
    ],
    products: ['crm', 'hubspot-auto'],
  },
  {
    id: 'marketing',
    icon: '🎯',
    color: '#6366f1',
    industry: { vi: 'Marketing & quảng cáo', en: 'Marketing & advertising' },
    headline: { vi: 'AI làm content, bạn làm chiến lược', en: 'AI makes content, you make strategy' },
    pain: {
      vi: 'Team marketing tốn 70% thời gian sản xuất content lặp lại. Thiếu dữ liệu để biết audience nào chuyển đổi tốt nhất.',
      en: 'Marketing teams spend 70% of their time on repetitive content production. No data on which audiences convert best.',
    },
    fix: {
      vi: 'Pipeline AI tự tạo video, âm nhạc, hình ảnh theo lịch. Dữ liệu Facebook/Google tự phân cụm và chấm điểm audience.',
      en: 'AI pipeline auto-generates video, music, visuals on schedule. Facebook/Google data auto-clusters and scores audiences.',
    },
    outcomes: [
      { vi: 'Content 24/7 không cần con người', en: '24/7 content without human intervention' },
      { vi: 'Giảm 80% chi phí sản xuất video', en: '80% reduction in video production costs' },
      { vi: 'Audience chất lượng cao hơn nhờ AI scoring', en: 'Higher quality audiences from AI scoring' },
    ],
    products: ['taomeettrap', 'bigdata-pipeline'],
  },
  {
    id: 'ops',
    icon: '⚙️',
    color: '#f59e0b',
    industry: { vi: 'Vận hành & IT', en: 'Operations & IT' },
    headline: { vi: 'Hạ tầng tự chăm sóc bản thân', en: 'Infrastructure that takes care of itself' },
    pain: {
      vi: 'IT phải kiểm tra thủ công hàng chục website, nhận tin nhắn lúc 2 giờ sáng khi có sự cố, không có báo cáo tổng thể.',
      en: 'IT manually checks dozens of websites, gets 2AM messages when things break, no consolidated reporting.',
    },
    fix: {
      vi: 'Dashboard tập trung theo dõi tất cả, alert Telegram ngay khi có vấn đề, AI phân tích xu hướng hiệu suất trước khi sự cố xảy ra.',
      en: 'Centralized dashboard monitors everything, Telegram alerts the instant issues appear, AI analyzes performance trends before problems occur.',
    },
    outcomes: [
      { vi: 'Phát hiện sự cố nhanh hơn 10×', en: '10× faster incident detection' },
      { vi: '99.8% uptime nhờ giám sát chủ động', en: '99.8% uptime through proactive monitoring' },
      { vi: 'Giảm 90% thời gian xử lý incident', en: '90% less time spent on incident response' },
    ],
    products: ['web-fleet'],
  },
  {
    id: 'ai-team',
    icon: '🤖',
    color: '#8b5cf6',
    industry: { vi: 'Doanh nghiệp muốn dùng AI', en: 'Businesses adopting AI' },
    headline: { vi: 'Đội AI sẵn sàng — không cần thuê thêm người', en: 'AI team ready to go — no new hires needed' },
    pain: {
      vi: 'Muốn ứng dụng AI nhưng không biết bắt đầu từ đâu. Thuê AI engineer tốn kém. Các tool AI ngoài thị trường không phù hợp quy trình nội bộ.',
      en: "Want to use AI but don't know where to start. Hiring AI engineers is expensive. Off-the-shelf AI tools don't fit internal workflows.",
    },
    fix: {
      vi: 'Hệ thống đa tác nhân tùy chỉnh theo quy trình của bạn. Tích hợp Claude, Gemini, GPT-4o vào workflow hiện tại trong vài ngày.',
      en: 'Multi-agent system customized to your workflow. Integrate Claude, Gemini, GPT-4o into existing processes in days.',
    },
    outcomes: [
      { vi: 'Workflow tự động hoàn toàn trong 2–4 tuần', en: 'Fully automated workflow in 2–4 weeks' },
      { vi: 'Tiết kiệm 40–60 giờ nhân công mỗi tháng', en: 'Save 40–60 man-hours per month' },
      { vi: 'ROI rõ ràng từ tháng đầu tiên', en: 'Clear ROI from the first month' },
    ],
    products: ['digital-office'],
  },
]
