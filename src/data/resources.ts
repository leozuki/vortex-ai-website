// ─── AI Models ───────────────────────────────────────────────
export interface AIModel {
  id: string
  name: string
  provider: string
  color: string
  tag: string
  tagColor: string
  strengths: string[]
  bestFor: { vi: string; en: string }
  contextWindow: string
  pricing: string
  url: string
}

export const aiModels: AIModel[] = [
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    color: '#d4a27a',
    tag: 'Best overall',
    tagColor: '#f59e0b',
    strengths: ['Reasoning sâu', 'Code & debug', 'Prompt dài', 'Ít hallucination'],
    bestFor: { vi: 'Lập trình, phân tích, viết dài, hệ thống AI phức tạp', en: 'Coding, analysis, long-form writing, complex AI systems' },
    contextWindow: '200K tokens',
    pricing: '$3 / 1M input tokens',
    url: 'https://anthropic.com',
  },
  {
    id: 'gemini-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    color: '#4285f4',
    tag: 'Fastest',
    tagColor: '#06b6d4',
    strengths: ['Tốc độ cao', 'Multimodal', 'Miễn phí tier', 'Google Search grounding'],
    bestFor: { vi: 'Real-time apps, xử lý ảnh/video, chatbot nhanh', en: 'Real-time apps, image/video processing, fast chatbots' },
    contextWindow: '1M tokens',
    pricing: 'Free tier + $0.075/1M',
    url: 'https://ai.google.dev',
  },
  {
    id: 'gpt4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    color: '#10a37f',
    tag: 'Most popular',
    tagColor: '#10b981',
    strengths: ['Vision tốt', 'Function calling', 'Ecosystem lớn', 'DALL-E integration'],
    bestFor: { vi: 'Vision tasks, tool use, creative writing, phổ thông nhất', en: 'Vision tasks, tool use, creative writing, most widely supported' },
    contextWindow: '128K tokens',
    pricing: '$2.50 / 1M input tokens',
    url: 'https://openai.com',
  },
  {
    id: 'llama',
    name: 'Llama 3.3 70B',
    provider: 'Meta / Ollama',
    color: '#0ea5e9',
    tag: 'Open source',
    tagColor: '#8b5cf6',
    strengths: ['Chạy local', 'Privacy tuyệt đối', 'Miễn phí', 'Fine-tune được'],
    bestFor: { vi: 'Dữ liệu nhạy cảm, offline, self-hosted, fine-tuning', en: 'Sensitive data, offline use, self-hosted, fine-tuning' },
    contextWindow: '128K tokens',
    pricing: 'Free (self-hosted)',
    url: 'https://ollama.com',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    color: '#6366f1',
    tag: 'Best value',
    tagColor: '#ec4899',
    strengths: ['Cực rẻ', 'Reasoning tốt', 'Math & code', 'Open weights'],
    bestFor: { vi: 'Toán học, lập trình, bài toán logic phức tạp với chi phí thấp', en: 'Math, coding, complex logic at very low cost' },
    contextWindow: '64K tokens',
    pricing: '$0.14 / 1M input tokens',
    url: 'https://deepseek.com',
  },
  {
    id: 'suno',
    name: 'Suno v4',
    provider: 'Suno AI',
    color: '#f59e0b',
    tag: 'Music AI',
    tagColor: '#f97316',
    strengths: ['Nhạc chất lượng cao', 'Custom lyrics', 'Nhiều thể loại', 'API access'],
    bestFor: { vi: 'Tạo nhạc nền, jingle quảng cáo, podcast intro, automation', en: 'Background music, ad jingles, podcast intros, automation' },
    contextWindow: 'N/A',
    pricing: '$10 / month (Pro)',
    url: 'https://suno.com',
  },
]

// ─── GitHub Repos ────────────────────────────────────────────
export interface GitHubRepo {
  id: string
  name: string
  displayName: string
  tagline: { vi: string; en: string }
  desc: { vi: string; en: string }
  stars: string
  tags: string[]
  color: string
  url: string
  category: string
  categoryColor: string
  install: string
  steps: { vi: string[]; en: string[] }
  useCases: { vi: string[]; en: string[] }
  killer: { vi: string; en: string }
}

export const githubRepos: GitHubRepo[] = [
  {
    id: 'ollama',
    name: 'ollama/ollama',
    displayName: 'Ollama',
    tagline: {
      vi: 'Chạy LLM trên máy tính cá nhân — 1 lệnh, không cần cloud',
      en: 'Run LLMs on your own machine — 1 command, no cloud needed',
    },
    desc: {
      vi: 'Ollama cho phép bạn tải và chạy hàng chục LLM mạnh mẽ (Llama 3, Gemma, Mistral, Qwen...) ngay trên laptop hoặc server của mình. Không cần API key, không tốn tiền hàng tháng, dữ liệu không ra khỏi máy. Viết bằng Go, tối ưu cho cả CPU lẫn GPU.',
      en: 'Ollama lets you download and run powerful LLMs (Llama 3, Gemma, Mistral, Qwen...) on your own laptop or server. No API key, no monthly bill, data never leaves your machine. Written in Go, optimized for both CPU and GPU.',
    },
    stars: '165k+',
    tags: ['Go', 'Local LLM', 'CLI', 'Privacy'],
    color: '#0ea5e9',
    url: 'https://github.com/ollama/ollama',
    category: 'Local AI',
    categoryColor: '#0ea5e9',
    install: 'curl -fsSL https://ollama.com/install.sh | sh',
    steps: {
      vi: [
        'Cài Ollama bằng lệnh install phía trên (Mac/Linux/Windows đều có)',
        'Tải model: `ollama pull llama3.3` — tự download ~4GB về máy',
        'Chạy chat: `ollama run llama3.3` — gõ câu hỏi, Enter để nhận trả lời',
        'Dùng qua API: `curl http://localhost:11434/api/generate -d \'{"model":"llama3.3","prompt":"Xin chào"}\'`',
        'Tích hợp với Open WebUI để có giao diện đẹp như ChatGPT',
      ],
      en: [
        'Install Ollama with the command above (Mac/Linux/Windows all supported)',
        'Pull a model: `ollama pull llama3.3` — auto-downloads ~4GB locally',
        'Start chatting: `ollama run llama3.3` — type your question, press Enter',
        'Use via API: `curl http://localhost:11434/api/generate -d \'{"model":"llama3.3","prompt":"Hello"}\'`',
        'Integrate with Open WebUI for a ChatGPT-like interface',
      ],
    },
    useCases: {
      vi: ['Xử lý tài liệu nội bộ không muốn upload lên cloud', 'Chạy AI offline khi không có internet', 'Fine-tune và thử nghiệm model riêng', 'Tích hợp vào app local không cần trả phí API'],
      en: ['Process internal documents without cloud upload', 'Run AI offline without internet', 'Fine-tune and experiment with custom models', 'Integrate into local apps without paying API fees'],
    },
    killer: {
      vi: 'Dữ liệu 100% ở máy bạn — không bao giờ ra ngoài. Lý tưởng cho doanh nghiệp có dữ liệu nhạy cảm.',
      en: 'Data stays 100% on your machine — never leaves. Ideal for businesses with sensitive data.',
    },
  },
  {
    id: 'open-webui',
    name: 'open-webui/open-webui',
    displayName: 'Open WebUI',
    tagline: {
      vi: 'Giao diện ChatGPT tự host — kết nối Ollama, OpenAI, bất kỳ LLM nào',
      en: 'Self-hosted ChatGPT UI — connects Ollama, OpenAI, any LLM',
    },
    desc: {
      vi: 'Open WebUI là giao diện web đẹp, đầy đủ tính năng để chat với bất kỳ LLM nào: Ollama local, OpenAI, Anthropic. Hỗ trợ RAG (đọc file PDF/Word), tạo ảnh với DALL-E/Stable Diffusion, quản lý nhiều model cùng lúc, và có hệ thống user/admin cho team. 124k+ stars.',
      en: 'Open WebUI is a beautiful, feature-rich web interface for chatting with any LLM: local Ollama, OpenAI, Anthropic. Supports RAG (read PDF/Word files), image generation with DALL-E/Stable Diffusion, multi-model management, and user/admin system for teams.',
    },
    stars: '124k+',
    tags: ['Docker', 'Python', 'RAG', 'Self-hosted'],
    color: '#6366f1',
    url: 'https://github.com/open-webui/open-webui',
    category: 'UI / Platform',
    categoryColor: '#6366f1',
    install: 'docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main',
    steps: {
      vi: [
        'Cài Docker Desktop trên máy (docker.com/products/docker-desktop)',
        'Chạy lệnh Docker phía trên — tự pull image và khởi động',
        'Mở trình duyệt vào `http://localhost:3000`',
        'Tạo tài khoản admin (lần đầu tiên), kết nối Ollama hoặc nhập OpenAI API key',
        'Upload file PDF/Word vào conversation để hỏi nội dung (RAG)',
      ],
      en: [
        'Install Docker Desktop on your machine (docker.com/products/docker-desktop)',
        'Run the Docker command above — auto-pulls image and starts up',
        'Open browser at `http://localhost:3000`',
        'Create admin account (first time), connect Ollama or enter OpenAI API key',
        'Upload PDF/Word files into conversation to ask questions about them (RAG)',
      ],
    },
    useCases: {
      vi: ['Team chatbot nội bộ không cần trả phí ChatGPT cho từng user', 'Hỏi đáp tài liệu công ty (PDF, Word, Excel)', 'Quản lý và so sánh nhiều model AI cùng lúc', 'Tích hợp function calling và tool use'],
      en: ['Internal team chatbot without paying ChatGPT per user', 'Q&A on company documents (PDF, Word, Excel)', 'Manage and compare multiple AI models simultaneously', 'Integrate function calling and tool use'],
    },
    killer: {
      vi: 'Thay thế hoàn toàn ChatGPT cho cả team — tự host, không giới hạn user, miễn phí.',
      en: 'Complete ChatGPT replacement for your team — self-hosted, unlimited users, free.',
    },
  },
  {
    id: 'langchain',
    name: 'langchain-ai/langchain',
    displayName: 'LangChain',
    tagline: {
      vi: 'Framework chuẩn để xây ứng dụng AI với LLM, chains và agents',
      en: 'The standard framework for building LLM apps, chains, and agents',
    },
    desc: {
      vi: 'LangChain là thư viện Python/JS phổ biến nhất để xây dựng ứng dụng AI production. Cung cấp abstraction cho LLM calls, prompt templates, memory, RAG pipelines, và agent tool use. Hơn 100k stars và ecosystem khổng lồ với hàng nghìn integration.',
      en: 'LangChain is the most popular Python/JS library for building production AI applications. Provides abstractions for LLM calls, prompt templates, memory, RAG pipelines, and agent tool use. 100k+ stars with massive ecosystem of thousands of integrations.',
    },
    stars: '100k+',
    tags: ['Python', 'JS', 'RAG', 'Agents', 'Chains'],
    color: '#10b981',
    url: 'https://github.com/langchain-ai/langchain',
    category: 'Framework',
    categoryColor: '#10b981',
    install: 'pip install langchain langchain-openai langchain-community',
    steps: {
      vi: [
        'Cài package: `pip install langchain langchain-openai`',
        'Set API key: `export OPENAI_API_KEY="sk-..."`',
        'Tạo chain đơn giản: `from langchain_openai import ChatOpenAI; llm = ChatOpenAI()`',
        'Build RAG pipeline: load file → split → embed → store vector → retrieval chain',
        'Tạo agent với tools: `from langchain.agents import create_react_agent` và define tools',
      ],
      en: [
        'Install packages: `pip install langchain langchain-openai`',
        'Set API key: `export OPENAI_API_KEY="sk-..."`',
        'Create a simple chain: `from langchain_openai import ChatOpenAI; llm = ChatOpenAI()`',
        'Build RAG pipeline: load file → split → embed → vector store → retrieval chain',
        'Create agent with tools: `from langchain.agents import create_react_agent` and define tools',
      ],
    },
    useCases: {
      vi: ['Chatbot hỏi đáp trên tài liệu nội bộ (RAG)', 'Agent tự động tìm kiếm web và tổng hợp thông tin', 'Pipeline phân tích dữ liệu với AI', 'Chatbot với memory và conversation history'],
      en: ['Document Q&A chatbot with internal files (RAG)', 'Agent that auto-searches web and synthesizes info', 'AI-powered data analysis pipeline', 'Chatbot with memory and conversation history'],
    },
    killer: {
      vi: '1000+ integrations sẵn sàng: databases, APIs, tools — plug and play không cần viết từ đầu.',
      en: '1000+ ready integrations: databases, APIs, tools — plug and play without coding from scratch.',
    },
  },
  {
    id: 'crewai',
    name: 'crewAIInc/crewAI',
    displayName: 'CrewAI',
    tagline: {
      vi: 'Xây đội AI đa tác nhân — mỗi agent có role, goal và tools riêng',
      en: 'Build multi-agent AI crews — each agent has its own role, goal, and tools',
    },
    desc: {
      vi: 'CrewAI cho phép bạn tạo nhiều AI agent cộng tác như một team thực sự. Mỗi agent có: role (vai trò), goal (mục tiêu), backstory (bối cảnh) và tools. Các agent tự phân công task, chia sẻ kết quả và kiểm tra lẫn nhau. Được dùng trong Fortune 500 companies.',
      en: 'CrewAI lets you create multiple AI agents collaborating like a real team. Each agent has: a role, goal, backstory, and tools. Agents self-assign tasks, share results, and review each other. Used by Fortune 500 companies.',
    },
    stars: '30k+',
    tags: ['Python', 'Multi-agent', 'Orchestration'],
    color: '#f59e0b',
    url: 'https://github.com/crewAIInc/crewAI',
    category: 'Multi-Agent',
    categoryColor: '#f59e0b',
    install: 'pip install crewai crewai-tools',
    steps: {
      vi: [
        'Cài: `pip install crewai crewai-tools`',
        'Định nghĩa agents: `Agent(role="Researcher", goal="...", backstory="...", tools=[...])`',
        'Định nghĩa tasks: `Task(description="Research AI trends", agent=researcher)`',
        'Tạo crew: `Crew(agents=[researcher, writer], tasks=[task1, task2], process=Process.sequential)`',
        'Chạy: `result = crew.kickoff()` — agents tự phối hợp hoàn thành',
      ],
      en: [
        'Install: `pip install crewai crewai-tools`',
        'Define agents: `Agent(role="Researcher", goal="...", backstory="...", tools=[...])`',
        'Define tasks: `Task(description="Research AI trends", agent=researcher)`',
        'Create crew: `Crew(agents=[researcher, writer], tasks=[task1, task2], process=Process.sequential)`',
        'Run: `result = crew.kickoff()` — agents self-coordinate to complete',
      ],
    },
    useCases: {
      vi: ['Pipeline nghiên cứu → viết báo cáo tự động', 'Team sales AI: prospecting → qualify → draft email', 'Quy trình review code: viết → test → document', 'Phân tích thị trường với nhiều agent chuyên biệt'],
      en: ['Research → auto report writing pipeline', 'AI sales team: prospecting → qualify → draft email', 'Code review workflow: write → test → document', 'Market analysis with specialized agents'],
    },
    killer: {
      vi: 'Role-based collaboration — agents tự thương lượng và chia việc, không cần lập trình từng bước.',
      en: 'Role-based collaboration — agents self-negotiate and divide work, no step-by-step programming needed.',
    },
  },
  {
    id: 'autogen',
    name: 'microsoft/autogen',
    displayName: 'AutoGen',
    tagline: {
      vi: 'Framework đa tác nhân của Microsoft — agents hội thoại và giải quyết vấn đề',
      en: 'Microsoft multi-agent framework — agents converse and solve problems together',
    },
    desc: {
      vi: 'AutoGen (Microsoft Research) là framework để xây hệ thống AI nơi nhiều agent "nói chuyện" với nhau để giải quyết task phức tạp. Có AssistantAgent (AI), UserProxyAgent (thực thi code), GroupChat (nhiều agent thảo luận). Rất phù hợp cho coding automation và research.',
      en: 'AutoGen (Microsoft Research) is a framework for building AI systems where multiple agents "converse" to solve complex tasks. Has AssistantAgent (AI), UserProxyAgent (executes code), GroupChat (multiple agents discuss). Great for coding automation and research.',
    },
    stars: '40k+',
    tags: ['Python', 'Multi-agent', 'Microsoft', 'Code execution'],
    color: '#0ea5e9',
    url: 'https://github.com/microsoft/autogen',
    category: 'Multi-Agent',
    categoryColor: '#0ea5e9',
    install: 'pip install pyautogen',
    steps: {
      vi: [
        'Cài: `pip install pyautogen`',
        'Config: `config_list = [{"model": "gpt-4o", "api_key": "sk-..."}]`',
        'Tạo AssistantAgent: `assistant = AssistantAgent("assistant", llm_config={"config_list": config_list})`',
        'Tạo UserProxyAgent: `user = UserProxyAgent("user", code_execution_config={"work_dir": "coding"})`',
        'Bắt đầu conversation: `user.initiate_chat(assistant, message="Viết code phân tích CSV")`',
      ],
      en: [
        'Install: `pip install pyautogen`',
        'Config: `config_list = [{"model": "gpt-4o", "api_key": "sk-..."}]`',
        'Create AssistantAgent: `assistant = AssistantAgent("assistant", llm_config={"config_list": config_list})`',
        'Create UserProxyAgent: `user = UserProxyAgent("user", code_execution_config={"work_dir": "coding"})`',
        'Start conversation: `user.initiate_chat(assistant, message="Write code to analyze CSV")`',
      ],
    },
    useCases: {
      vi: ['Tự động hóa data analysis: agent viết code → agent chạy → agent sửa lỗi', 'Research agent tự tìm kiếm, đọc paper và tóm tắt', 'Software development team: planner + coder + reviewer', 'Giải bài toán toán học phức tạp với nhiều bước'],
      en: ['Automate data analysis: agent writes code → agent runs → agent fixes bugs', 'Research agent auto-searches, reads papers and summarizes', 'Software dev team: planner + coder + reviewer', 'Solve complex math problems with multi-step reasoning'],
    },
    killer: {
      vi: 'Conversation-driven problem solving — agents "tranh luận" cho đến khi ra kết quả đúng.',
      en: 'Conversation-driven problem solving — agents "debate" until they reach the correct result.',
    },
  },
  {
    id: 'metagpt',
    name: 'geekan/MetaGPT',
    displayName: 'MetaGPT',
    tagline: {
      vi: 'Công ty phần mềm AI — 1 dòng lệnh ra toàn bộ codebase',
      en: 'AI software company — 1 line input outputs an entire codebase',
    },
    desc: {
      vi: 'MetaGPT mô phỏng một công ty phần mềm hoàn chỉnh với các AI agent đóng vai: Product Manager, Architect, Engineer, QA. Bạn chỉ cần mô tả yêu cầu bằng tiếng tự nhiên — MetaGPT tự viết PRD, thiết kế kiến trúc, code, và test. Rất ấn tượng cho prototype nhanh.',
      en: "MetaGPT simulates a complete software company with AI agents playing roles: Product Manager, Architect, Engineer, QA. You just describe requirements in natural language — MetaGPT auto-writes PRD, designs architecture, codes, and tests. Impressive for rapid prototyping.",
    },
    stars: '45k+',
    tags: ['Python', 'Software engineering', 'Multi-agent', 'Code gen'],
    color: '#8b5cf6',
    url: 'https://github.com/geekan/MetaGPT',
    category: 'Code Generation',
    categoryColor: '#8b5cf6',
    install: 'pip install metagpt',
    steps: {
      vi: [
        'Cài: `pip install metagpt`',
        'Config API key: `metagpt --init` rồi điền OpenAI/Claude API key',
        'Chạy: `metagpt "Xây một web scraper lấy tin tức từ VnExpress"` ',
        'MetaGPT tự tạo: requirements.md → system_design.md → code → tests',
        'Xem output trong thư mục `workspace/` — có thể chạy trực tiếp',
      ],
      en: [
        'Install: `pip install metagpt`',
        'Config API key: `metagpt --init` then enter OpenAI/Claude API key',
        'Run: `metagpt "Build a web scraper to get news from BBC"`',
        'MetaGPT auto-creates: requirements.md → system_design.md → code → tests',
        'See output in `workspace/` directory — ready to run directly',
      ],
    },
    useCases: {
      vi: ['Tạo nhanh prototype cho demo khách hàng', 'Tự động hóa task lập trình lặp đi lặp lại', 'Học cách architect một hệ thống qua ví dụ', 'Tạo boilerplate code với đầy đủ structure'],
      en: ['Quickly create prototype for customer demos', 'Automate repetitive programming tasks', 'Learn system architecture through examples', 'Generate boilerplate code with full structure'],
    },
    killer: {
      vi: 'Một mình bạn + MetaGPT = cả team phần mềm. Từ ý tưởng ra code chạy được trong vài phút.',
      en: 'You alone + MetaGPT = entire software team. From idea to running code in minutes.',
    },
  },
  {
    id: 'dify',
    name: 'langgenius/dify',
    displayName: 'Dify',
    tagline: {
      vi: 'Nền tảng xây AI app bằng drag-and-drop — không cần code nhiều',
      en: 'Build AI apps with drag-and-drop — minimal coding required',
    },
    desc: {
      vi: 'Dify là platform low-code để xây AI applications và chatbot. Có workflow builder visual, RAG pipeline, prompt management, monitoring/analytics, và hỗ trợ 50+ LLM providers. Self-host được hoặc dùng cloud. 136k+ stars, được tin dùng ở enterprise.',
      en: 'Dify is a low-code platform for building AI applications and chatbots. Has visual workflow builder, RAG pipeline, prompt management, monitoring/analytics, and supports 50+ LLM providers. Self-hostable or cloud. 136k+ stars, trusted in enterprise.',
    },
    stars: '136k+',
    tags: ['Docker', 'Low-code', 'Workflow', 'RAG'],
    color: '#6366f1',
    url: 'https://github.com/langgenius/dify',
    category: 'Platform',
    categoryColor: '#6366f1',
    install: 'git clone https://github.com/langgenius/dify && cd dify/docker && cp .env.example .env && docker compose up -d',
    steps: {
      vi: [
        'Clone repo và chạy Docker Compose (xem lệnh install phía trên)',
        'Mở `http://localhost` — tạo tài khoản admin',
        'Vào Settings → Model Provider → thêm API key (OpenAI/Anthropic/...)',
        'Tạo app mới → chọn loại: Chatbot / Agent / Workflow',
        'Kéo thả các block: LLM, Tools, Conditions, Code — chạy và test ngay',
      ],
      en: [
        'Clone repo and run Docker Compose (see install command above)',
        'Open `http://localhost` — create admin account',
        'Go to Settings → Model Provider → add API keys (OpenAI/Anthropic/...)',
        'Create new app → choose type: Chatbot / Agent / Workflow',
        'Drag and drop blocks: LLM, Tools, Conditions, Code — run and test immediately',
      ],
    },
    useCases: {
      vi: ['Customer support chatbot với RAG trên tài liệu sản phẩm', 'Workflow tự động hóa quy trình nghiệp vụ', 'Internal knowledge base Q&A cho toàn công ty', 'Prototype AI feature nhanh trước khi viết code thật'],
      en: ['Customer support chatbot with RAG on product docs', 'Automate business process workflows', 'Internal company-wide knowledge base Q&A', 'Quickly prototype AI features before writing real code'],
    },
    killer: {
      vi: '⚡ Từ ý tưởng đến chatbot chạy production trong 30 phút — không cần backend engineer.',
      en: '⚡ From idea to production chatbot in 30 minutes — no backend engineer needed.',
    },
  },
  {
    id: 'n8n',
    name: 'n8n-io/n8n',
    displayName: 'n8n',
    tagline: {
      vi: 'Automation workflow với AI nodes — Zapier tự host, mạnh hơn nhiều',
      en: 'Workflow automation with AI nodes — self-hosted Zapier, far more powerful',
    },
    desc: {
      vi: 'n8n là workflow automation platform self-host với 400+ integrations. Đặc biệt mạnh với AI: có native LangChain nodes, AI Agent node, vector store, và memory. Kết nối ChatGPT/Claude với database, email, Slack, CRM, API bất kỳ. 150k+ stars.',
      en: "n8n is a self-hosted workflow automation platform with 400+ integrations. Especially powerful with AI: native LangChain nodes, AI Agent node, vector stores, and memory. Connect ChatGPT/Claude with databases, email, Slack, CRM, any API. 150k+ stars.",
    },
    stars: '150k+',
    tags: ['Node.js', 'Docker', 'Automation', 'No-code', 'AI nodes'],
    color: '#f97316',
    url: 'https://github.com/n8n-io/n8n',
    category: 'Automation',
    categoryColor: '#f97316',
    install: 'docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n docker.n8n.io/n8nio/n8n',
    steps: {
      vi: [
        'Chạy Docker command phía trên — mở `http://localhost:5678`',
        'Tạo tài khoản owner, vào dashboard',
        'Click "New Workflow" → kéo thả node từ panel bên trái',
        'Thêm AI Agent node → kết nối với OpenAI node → thêm tool nodes (HTTP/DB/Email)',
        'Set trigger (Webhook/Schedule/Manual) → Save → Activate',
      ],
      en: [
        'Run the Docker command above — open `http://localhost:5678`',
        'Create owner account, enter dashboard',
        'Click "New Workflow" → drag nodes from left panel',
        'Add AI Agent node → connect with OpenAI node → add tool nodes (HTTP/DB/Email)',
        'Set trigger (Webhook/Schedule/Manual) → Save → Activate',
      ],
    },
    useCases: {
      vi: ['AI agent tự check email → phân loại → trả lời tự động', 'Sync data giữa CRM, database, Google Sheets với AI transform', 'Chatbot Telegram/Slack kết nối với RAG nội bộ', 'Pipeline báo cáo tự động: lấy data → AI phân tích → gửi email'],
      en: ['AI agent auto-checks email → classifies → auto-replies', 'Sync data between CRM, database, Google Sheets with AI transform', 'Telegram/Slack chatbot connected to internal RAG', 'Auto report pipeline: fetch data → AI analyze → send email'],
    },
    killer: {
      vi: '400+ integrations + AI nodes = tự động hóa mọi thứ có thể tưởng tượng, không giới hạn.',
      en: '400+ integrations + AI nodes = automate anything imaginable, no limits.',
    },
  },
  {
    id: 'claude-code',
    name: 'anthropics/claude-code',
    displayName: 'Claude Code',
    tagline: {
      vi: 'AI coding agent trong terminal — hiểu toàn bộ codebase của bạn',
      en: 'AI coding agent in the terminal — understands your entire codebase',
    },
    desc: {
      vi: 'Claude Code là AI agent chạy trong terminal, hiểu toàn bộ codebase, chạy lệnh bash, sửa file, và hoàn thành task phức tạp tự động. Không phải autocomplete — là agent thực sự có thể refactor, debug, viết test, và implement feature từ đầu đến cuối.',
      en: 'Claude Code is an AI agent running in the terminal that understands your entire codebase, runs bash commands, edits files, and completes complex tasks autonomously. Not autocomplete — a real agent that can refactor, debug, write tests, and implement features end-to-end.',
    },
    stars: '20k+',
    tags: ['CLI', 'Agent', 'TypeScript', 'Coding'],
    color: '#d4a27a',
    url: 'https://github.com/anthropics/claude-code',
    category: 'Dev Tools',
    categoryColor: '#d4a27a',
    install: 'npm install -g @anthropic-ai/claude-code',
    steps: {
      vi: [
        'Cài: `npm install -g @anthropic-ai/claude-code`',
        'Lấy API key từ console.anthropic.com',
        'Vào project folder: `cd my-project`',
        'Chạy: `claude` — bắt đầu hội thoại với AI biết toàn bộ code của bạn',
        'Giao task: "Refactor auth module thành JWT", "Thêm pagination vào API", "Fix bug line 45"...',
      ],
      en: [
        'Install: `npm install -g @anthropic-ai/claude-code`',
        'Get API key from console.anthropic.com',
        'Navigate to project: `cd my-project`',
        'Run: `claude` — start conversation with AI that knows your entire codebase',
        'Delegate tasks: "Refactor auth to JWT", "Add pagination to API", "Fix bug at line 45"...',
      ],
    },
    useCases: {
      vi: ['Refactor codebase lớn: hiểu toàn bộ context trước khi sửa', 'Debug lỗi phức tạp spanning nhiều file', 'Viết unit test cho toàn bộ module', 'Implement feature mới từ spec đến code chạy được'],
      en: ['Refactor large codebases: understands full context before editing', 'Debug complex multi-file errors', 'Write unit tests for entire modules', 'Implement new features from spec to working code'],
    },
    killer: {
      vi: 'Không phải Copilot — là AI biết TOÀN BỘ codebase và tự làm từ đầu đến cuối không cần giám sát.',
      en: 'Not Copilot — an AI that knows your ENTIRE codebase and works end-to-end without supervision.',
    },
  },
  {
    id: 'llama-cpp',
    name: 'ggerganov/llama.cpp',
    displayName: 'llama.cpp',
    tagline: {
      vi: 'Chạy LLM tốc độ cao trên CPU — nền tảng của hầu hết local AI',
      en: 'Run LLMs at high speed on CPU — the foundation of most local AI',
    },
    desc: {
      vi: 'llama.cpp viết bằng C/C++ thuần, cho phép chạy các model LLM lớn ngay trên CPU với tốc độ đáng ngạc nhiên. Là engine phía sau Ollama và nhiều app local AI khác. Hỗ trợ quantization (GGUF format) để giảm kích thước model mà vẫn giữ chất lượng tốt.',
      en: 'llama.cpp is written in pure C/C++, allowing large LLM models to run on CPU with surprising speed. It is the engine behind Ollama and many other local AI apps. Supports quantization (GGUF format) to reduce model size while maintaining quality.',
    },
    stars: '75k+',
    tags: ['C++', 'CPU inference', 'GGUF', 'Performance', 'Edge'],
    color: '#8b5cf6',
    url: 'https://github.com/ggerganov/llama.cpp',
    category: 'Inference',
    categoryColor: '#8b5cf6',
    install: 'git clone https://github.com/ggerganov/llama.cpp && cd llama.cpp && make -j4',
    steps: {
      vi: [
        'Clone và build: `git clone ... && cd llama.cpp && make -j4`',
        'Tải model GGUF từ HuggingFace (ví dụ: Llama-3-8B-Instruct.Q4_K_M.gguf)',
        'Chạy inference: `./llama-cli -m models/llama3.gguf -p "Câu hỏi của bạn" -n 256`',
        'Chạy server: `./llama-server -m models/llama3.gguf --port 8080` — có OpenAI-compatible API',
        'Dùng Python binding: `pip install llama-cpp-python` cho tích hợp dễ hơn',
      ],
      en: [
        'Clone and build: `git clone ... && cd llama.cpp && make -j4`',
        'Download GGUF model from HuggingFace (e.g., Llama-3-8B-Instruct.Q4_K_M.gguf)',
        'Run inference: `./llama-cli -m models/llama3.gguf -p "Your question" -n 256`',
        'Run server: `./llama-server -m models/llama3.gguf --port 8080` — OpenAI-compatible API',
        'Use Python binding: `pip install llama-cpp-python` for easier integration',
      ],
    },
    useCases: {
      vi: ['Edge deployment: chạy AI trên Raspberry Pi, thiết bị không có GPU', 'Tích hợp LLM vào C++ application native', 'Benchmark và compare model quantization levels', 'Server local AI với OpenAI-compatible endpoint'],
      en: ['Edge deployment: run AI on Raspberry Pi, devices without GPU', 'Integrate LLM into native C++ applications', 'Benchmark and compare model quantization levels', 'Local AI server with OpenAI-compatible endpoint'],
    },
    killer: {
      vi: '⚡ Chạy Llama 3 8B trên CPU Intel thường với 10-20 tokens/giây — không cần GPU đắt tiền.',
      en: '⚡ Run Llama 3 8B on a regular Intel CPU at 10-20 tokens/second — no expensive GPU needed.',
    },
  },
  {
    id: 'autogpt',
    name: 'Significant-Gravitas/AutoGPT',
    displayName: 'AutoGPT',
    tagline: {
      vi: 'Tác nhân AI tự chủ đầu tiên — đặt mục tiêu, AI tự làm tất cả',
      en: 'The first autonomous AI agent — set a goal, AI does everything',
    },
    desc: {
      vi: 'AutoGPT là project đầu tiên chứng minh AI có thể hoạt động tự chủ: nhận mục tiêu, tự lên kế hoạch, tự dùng tools (web search, file I/O, code execution) và tự cải thiện output. 170k+ stars — project viral nhất lịch sử GitHub AI. Hiện đã có platform đầy đủ.',
      en: 'AutoGPT was the first project to prove AI can operate autonomously: receive a goal, self-plan, self-use tools (web search, file I/O, code execution) and self-improve output. 170k+ stars — the most viral AI project in GitHub history. Now has a full platform.',
    },
    stars: '170k+',
    tags: ['Python', 'Autonomous', 'Pioneer', 'Tools'],
    color: '#ec4899',
    url: 'https://github.com/Significant-Gravitas/AutoGPT',
    category: 'Autonomous Agent',
    categoryColor: '#ec4899',
    install: 'git clone https://github.com/Significant-Gravitas/AutoGPT && cd AutoGPT && ./run setup',
    steps: {
      vi: [
        'Clone repo: `git clone https://github.com/Significant-Gravitas/AutoGPT`',
        'Chạy setup: `cd AutoGPT && ./run setup` — cài dependencies tự động',
        'Thêm API keys vào `.env` file (OpenAI, search API)',
        'Chạy: `./run agent start` — nhập mục tiêu bằng tiếng tự nhiên',
        'AutoGPT tự lên kế hoạch, hỏi confirm từng bước quan trọng rồi thực thi',
      ],
      en: [
        'Clone repo: `git clone https://github.com/Significant-Gravitas/AutoGPT`',
        'Run setup: `cd AutoGPT && ./run setup` — auto-installs dependencies',
        'Add API keys to `.env` file (OpenAI, search API)',
        'Run: `./run agent start` — enter your goal in natural language',
        'AutoGPT self-plans, asks to confirm key steps, then executes',
      ],
    },
    useCases: {
      vi: ['Research tự động: tìm kiếm, đọc, tổng hợp về bất kỳ chủ đề nào', 'Tự động hoá task business phức tạp nhiều bước', 'Học cách AI agent architecture hoạt động', 'Xây prototype agentic workflow nhanh'],
      en: ['Auto-research: search, read, synthesize on any topic', 'Automate complex multi-step business tasks', 'Learn how AI agent architecture works', 'Quickly prototype agentic workflows'],
    },
    killer: {
      vi: 'Project đã thay đổi cả ngành AI — chứng minh LLM có thể làm việc tự chủ mà không cần human-in-the-loop.',
      en: 'The project that changed the entire AI industry — proved LLMs can work autonomously without human-in-the-loop.',
    },
  },
  {
    id: 'rag-flow',
    name: 'infiniflow/ragflow',
    displayName: 'RAGFlow',
    tagline: {
      vi: 'RAG engine thông minh — hiểu document như con người, không chỉ tìm kiếm từ khóa',
      en: 'Intelligent RAG engine — understands documents like humans, not just keyword search',
    },
    desc: {
      vi: 'RAGFlow là RAG platform enterprise-grade với khả năng phân tích document cực sâu: hiểu cấu trúc bảng biểu, hình ảnh, layout phức tạp trong PDF. Dùng deep document understanding thay vì naive chunking. 70k+ stars, được đánh giá là RAG engine chính xác nhất 2025.',
      en: 'RAGFlow is an enterprise-grade RAG platform with deep document analysis: understands table structures, images, complex layouts in PDFs. Uses deep document understanding instead of naive chunking. 70k+ stars, rated as the most accurate RAG engine of 2025.',
    },
    stars: '70k+',
    tags: ['Python', 'Docker', 'RAG', 'Enterprise', 'PDF'],
    color: '#14b8a6',
    url: 'https://github.com/infiniflow/ragflow',
    category: 'RAG / Knowledge',
    categoryColor: '#14b8a6',
    install: 'git clone https://github.com/infiniflow/ragflow && cd ragflow/docker && docker compose -f docker-compose.yml up -d',
    steps: {
      vi: [
        'Clone và chạy Docker Compose (xem lệnh install)',
        'Mở `http://localhost` → tạo tài khoản',
        'Tạo Knowledge Base → upload tài liệu (PDF, Word, Excel, PowerPoint)',
        'RAGFlow tự parse, chunk thông minh, hiểu cả table và hình',
        'Tạo Chatbot → liên kết với Knowledge Base → test hỏi đáp',
      ],
      en: [
        'Clone and run Docker Compose (see install command)',
        'Open `http://localhost` → create account',
        'Create Knowledge Base → upload documents (PDF, Word, Excel, PowerPoint)',
        'RAGFlow auto-parses, smart-chunks, understands tables and images',
        'Create Chatbot → link to Knowledge Base → test Q&A',
      ],
    },
    useCases: {
      vi: ['Chatbot hỏi đáp hợp đồng/luật/quy định với độ chính xác cao', 'Internal knowledge base cho HR, legal, finance', 'Phân tích báo cáo tài chính với table understanding', 'Customer support từ tài liệu kỹ thuật phức tạp'],
      en: ['High-accuracy Q&A chatbot on contracts/law/regulations', 'Internal knowledge base for HR, legal, finance', 'Financial report analysis with table understanding', 'Customer support from complex technical documentation'],
    },
    killer: {
      vi: 'Hiểu bảng biểu và hình ảnh trong PDF — RAG khác biệt so với 99% tools chỉ đọc text thô.',
      en: 'Understands tables and images in PDFs — RAG that differs from 99% of tools that only read raw text.',
    },
  },
]

// ─── Prompt Library ──────────────────────────────────────────
export interface Prompt {
  id: string
  title: { vi: string; en: string }
  category: string
  categoryColor: string
  desc: { vi: string; en: string }
  prompt: string
  tags: string[]
}

export const prompts: Prompt[] = [
  {
    id: 'system-coder',
    title: { vi: 'Senior Developer AI', en: 'Senior Developer AI' },
    category: 'System Prompt',
    categoryColor: '#6366f1',
    desc: { vi: 'Biến AI thành senior dev dày dạn kinh nghiệm, code sạch, giải thích rõ', en: 'Turn AI into a seasoned senior dev who writes clean code and explains clearly' },
    prompt: `You are a senior full-stack engineer with 10+ years of experience. When writing code:
- Prefer simplicity and readability over cleverness
- Write self-documenting code with meaningful names
- Point out potential edge cases and security issues
- Suggest better approaches when you see them
- Be concise in explanations — show, don't tell
Language: match the user's language (Vietnamese or English)`,
    tags: ['Coding', 'System', 'Dev'],
  },
  {
    id: 'chain-of-thought',
    title: { vi: 'Phân tích từng bước (Chain-of-Thought)', en: 'Step-by-step Analysis (Chain-of-Thought)' },
    category: 'Technique',
    categoryColor: '#f59e0b',
    desc: { vi: 'Buộc AI suy nghĩ từng bước trước khi đưa ra kết luận — giảm lỗi 40%', en: 'Force AI to reason step-by-step before concluding — reduces errors by 40%' },
    prompt: `Before answering, think through this step by step:
1. Identify what is actually being asked
2. Break down the problem into smaller parts
3. Consider edge cases and potential issues
4. Work through the solution logically
5. Verify your answer makes sense
Then provide your final answer.

Problem: [YOUR QUESTION HERE]`,
    tags: ['Reasoning', 'Accuracy', 'Technique'],
  },
  {
    id: 'marketing-copy',
    title: { vi: 'Copywriter AI (Framework AIDA)', en: 'AI Copywriter (AIDA Framework)' },
    category: 'Marketing',
    categoryColor: '#10b981',
    desc: { vi: 'Viết copy theo công thức AIDA — chuyển đổi cao, ngôn ngữ thuyết phục', en: 'Write copy using AIDA formula — high conversion, persuasive language' },
    prompt: `Write marketing copy using the AIDA framework:
- Attention: Hook that stops the scroll (specific problem or bold claim)
- Interest: Why this matters to them specifically
- Desire: Paint the outcome — what life looks like after
- Action: Clear, low-friction CTA

Product/Service: [DESCRIBE YOUR PRODUCT]
Target audience: [WHO ARE THEY]
Tone: [professional/casual/urgent/etc]
Platform: [website/email/social]`,
    tags: ['Marketing', 'Copy', 'AIDA'],
  },
  {
    id: 'code-review',
    title: { vi: 'Code Reviewer Khắt Khe', en: 'Strict Code Reviewer' },
    category: 'Code',
    categoryColor: '#8b5cf6',
    desc: { vi: 'Review code như senior engineer thực sự — security, performance, maintainability', en: 'Review code like a real senior engineer — security, performance, maintainability' },
    prompt: `Review this code thoroughly. Check for:
1. **Security**: SQL injection, XSS, auth bypass, exposed secrets
2. **Performance**: N+1 queries, unnecessary re-renders, memory leaks
3. **Maintainability**: Magic numbers, unclear naming, missing error handling
4. **Logic errors**: Edge cases, off-by-one errors, race conditions
5. **Best practices**: SOLID principles, DRY violations

For each issue found: explain WHY it's a problem and HOW to fix it.
Severity: [Critical / High / Medium / Low]

Code:
\`\`\`
[PASTE CODE HERE]
\`\`\``,
    tags: ['Code', 'Review', 'Security'],
  },
  {
    id: 'data-analyst',
    title: { vi: 'Data Analyst AI', en: 'AI Data Analyst' },
    category: 'Analytics',
    categoryColor: '#06b6d4',
    desc: { vi: 'Phân tích dữ liệu, tìm insight, đề xuất action — như có data analyst riêng', en: 'Analyze data, find insights, suggest actions — like having your own data analyst' },
    prompt: `You are a data analyst. Given this data, provide:
1. **Key findings**: 3–5 most important observations
2. **Trends**: What's growing, declining, or anomalous
3. **Root cause hypotheses**: Why these patterns might exist
4. **Actionable recommendations**: Specific next steps ranked by impact
5. **Data quality notes**: Missing data, outliers, limitations

Format: Use bullet points. Be specific — cite numbers, not vague statements.

Data: [PASTE YOUR DATA OR DESCRIPTION]`,
    tags: ['Data', 'Analytics', 'Insights'],
  },
  {
    id: 'prompt-improver',
    title: { vi: 'Cải thiện Prompt của bạn', en: 'Improve Your Prompt' },
    category: 'Meta',
    categoryColor: '#ec4899',
    desc: { vi: 'Dùng AI để làm cho prompt của bạn tốt hơn — vòng lặp tự cải thiện', en: 'Use AI to make your own prompts better — self-improving loop' },
    prompt: `I have a prompt that's not working well. Help me improve it.

My current prompt:
"""
[PASTE YOUR CURRENT PROMPT]
"""

Expected output (what I want):
[DESCRIBE WHAT YOU WANT THE AI TO PRODUCE]

What's going wrong:
[DESCRIBE THE PROBLEM WITH CURRENT OUTPUT]

Please:
1. Identify why the current prompt is failing
2. Rewrite it with clear instructions, context, and constraints
3. Explain what you changed and why`,
    tags: ['Meta', 'Prompting', 'Improvement'],
  },
]

// ─── AI Tips ─────────────────────────────────────────────────
export interface AITip {
  id: string
  icon: string
  color: string
  title: { vi: string; en: string }
  body: { vi: string; en: string }
  level: 'beginner' | 'intermediate' | 'advanced'
}

export const aiTips: AITip[] = [
  {
    id: 'context-first',
    icon: '',
    color: '#6366f1',
    title: { vi: 'Context trước, câu hỏi sau', en: 'Context first, question second' },
    body: {
      vi: 'Đừng hỏi thẳng. Hãy giải thích bạn là ai, đang làm gì, output mong muốn là gì trước. AI như người mới vào team — cần được brief đầy đủ.',
      en: "Don't ask directly. Explain who you are, what you're doing, and what output you want first. AI is like a new team member — needs a proper brief.",
    },
    level: 'beginner',
  },
  {
    id: 'role-play',
    icon: '',
    color: '#8b5cf6',
    title: { vi: 'Gán role cụ thể cho AI', en: 'Assign a specific role to AI' },
    body: {
      vi: '"Act as a senior security engineer" cho output tốt hơn rất nhiều so với chỉ hỏi về security. Role cụ thể → tone, vocabulary, và depth tốt hơn.',
      en: '"Act as a senior security engineer" gives much better output than just asking about security. Specific role → better tone, vocabulary, and depth.',
    },
    level: 'beginner',
  },
  {
    id: 'few-shot',
    icon: '',
    color: '#10b981',
    title: { vi: 'Few-shot: cho ví dụ mẫu', en: 'Few-shot: give example outputs' },
    body: {
      vi: 'Thay vì mô tả output mong muốn bằng lời, hãy đưa 2–3 ví dụ cụ thể. "Hãy viết như thế này: [example 1], [example 2]" — AI sẽ bắt chước pattern.',
      en: 'Instead of describing the desired output in words, give 2–3 concrete examples. "Write like this: [example 1], [example 2]" — AI will mimic the pattern.',
    },
    level: 'intermediate',
  },
  {
    id: 'temperature',
    icon: '',
    color: '#f59e0b',
    title: { vi: 'Điều chỉnh "nhiệt độ" theo task', en: 'Adjust temperature by task' },
    body: {
      vi: 'Temperature thấp (0–0.3) cho code, factual, analysis. Temperature cao (0.7–1.0) cho creative writing, brainstorm. Mặc định 0.7 là compromise.',
      en: 'Low temperature (0–0.3) for code, factual work, analysis. High temperature (0.7–1.0) for creative writing, brainstorming. Default 0.7 is a compromise.',
    },
    level: 'intermediate',
  },
  {
    id: 'chain-prompts',
    icon: 'pipeline',
    color: '#06b6d4',
    title: { vi: 'Chain prompts thay vì mega-prompt', en: 'Chain prompts instead of mega-prompts' },
    body: {
      vi: 'Chia task lớn thành các bước nhỏ. Prompt 1 → lấy output → dùng làm input cho Prompt 2. Kết quả tốt hơn 1 prompt khổng lồ cố gắng làm tất cả.',
      en: 'Break big tasks into small steps. Prompt 1 → get output → use as input for Prompt 2. Better results than one massive prompt trying to do everything.',
    },
    level: 'intermediate',
  },
  {
    id: 'xml-structure',
    icon: '',
    color: '#ec4899',
    title: { vi: 'Dùng XML tags để cấu trúc prompt (với Claude)', en: 'Use XML tags to structure prompts (with Claude)' },
    body: {
      vi: 'Claude hiểu XML rất tốt. Dùng <context>, <task>, <constraints>, <output_format> để phân tách rõ ràng. Giảm ambiguity, tăng chất lượng output.',
      en: 'Claude understands XML very well. Use <context>, <task>, <constraints>, <output_format> to clearly separate sections. Less ambiguity, better output.',
    },
    level: 'advanced',
  },
  {
    id: 'verify-output',
    icon: '',
    color: '#f97316',
    title: { vi: 'Luôn verify — AI tự tin nhưng có thể sai', en: 'Always verify — AI is confident but can be wrong' },
    body: {
      vi: 'AI không biết nó không biết. Với thông tin quan trọng, hãy hỏi "Bạn có chắc không? Nguồn là gì?" hoặc verify bằng nguồn độc lập.',
      en: "AI doesn't know what it doesn't know. For important information, ask \"Are you sure? What's the source?\" or verify with independent sources.",
    },
    level: 'beginner',
  },
  {
    id: 'system-prompt',
    icon: 'settings',
    color: '#14b8a6',
    title: { vi: 'System prompt = DNA của AI của bạn', en: 'System prompt = your AI\'s DNA' },
    body: {
      vi: 'System prompt chạy ẩn, set tone và behavior cho toàn bộ conversation. Đầu tư 30 phút viết system prompt tốt = tiết kiệm hàng trăm giờ sau đó.',
      en: 'System prompt runs hidden, sets tone and behavior for the entire conversation. Invest 30 minutes writing a great system prompt = save hundreds of hours later.',
    },
    level: 'advanced',
  },
]
