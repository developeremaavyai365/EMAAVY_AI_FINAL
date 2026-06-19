const pw = require('playwright');
(async () => {
  const b = await pw.chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto('https://vapi.ai', { waitUntil: 'networkidle', timeout: 30000 });
  await p.waitForTimeout(3000);
  await p.screenshot({ path: 'C:\\Users\\DELL\\Desktop\\vapi_full.png', fullPage: true });
  const pos = [0, 900, 1800, 2700, 3600, 4500, 5400, 6300];
  for (let i = 0; i < pos.length; i++) {
    await p.evaluate((y) => window.scrollTo(0, y), pos[i]);
    await p.waitForTimeout(700);
    await p.screenshot({ path: `C:\\Users\\DELL\\Desktop\\vapi_s${i}.png` });
  }
  await b.close();
  console.log('done');
})();
