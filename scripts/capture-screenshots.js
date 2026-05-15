/**
 * Screenshot capture script — chụp tất cả sản phẩm đang chạy local
 * Run: node scripts/capture-screenshots.js
 */
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const OUT_DIR = path.join(__dirname, '../public/screenshots')
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

// Map đúng product ID → port thực tế đã xác nhận
const PRODUCTS = [
  // port 5174 = Digital Office (Workflows/Brain/Marketing tabs)
  { id: 'digital-office',   url: 'http://localhost:5174', wait: 4000 },
  // port 5175 = CRM frontend (NestJS)
  { id: 'crm',              url: 'http://localhost:5175', wait: 5000 },
  // port 5000 = BigData Pipeline dashboard (Flask) ✅ confirmed
  { id: 'bigdata-pipeline', url: 'http://localhost:5000', wait: 3000 },
  // port 5173 = OmniPost / Autopost (multi-channel publisher)
  { id: 'hubspot-auto',     url: 'http://localhost:5173', wait: 3000 },
  // port 5180 = ArcSo / AccountOS ✅ confirmed
  { id: 'arcso',            url: 'http://localhost:5180', wait: 3000 },
  // port 5183 = ? need to discover
  { id: 'extensions-suite', url: 'http://localhost:5183', wait: 5000 },
  // port 5181 = autopost (second frontend?)
  { id: 'taomeettrap',      url: 'http://localhost:5181', wait: 5000 },
  // port 5177 = CRM root frontend
  { id: 'crm-v2',          url: 'http://localhost:5177', wait: 4000 },
]

async function capture() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })

  for (const product of PRODUCTS) {
    console.log(`📸 Chụp ${product.id} → ${product.url}...`)
    const page = await ctx.newPage()
    try {
      await page.goto(product.url, { timeout: product.timeout || 20000, waitUntil: 'networkidle' })
      await page.waitForTimeout(product.wait)
      try { await page.addStyleTag({ content: '::-webkit-scrollbar { display: none !important }' }) } catch {}
      const outPath = path.join(OUT_DIR, `${product.id}.png`)
      await page.screenshot({ path: outPath, fullPage: false })
      console.log(`  ✅ Saved: ${outPath}`)
    } catch (err) {
      console.warn(`  ❌ ${product.id}: ${err.message.split('\n')[0]}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('\n🎉 Done! Check public/screenshots/')
}

capture().catch(console.error)
