const puppeteer = require("puppeteer");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class OriginCrawler {
  async init(id, pw, env="non-console") {
    this.browser = await puppeteer.launch({headless: false});
    this.page = await this.browser.newPage();
    await this.page.goto("https://www.origin.com/kor/en-us/store"); // TODO: 연결 실패 오류 처리 필요
    await this.page.waitForSelector('#shell > section > div > nav > div > div.origin-navigation-top.origin-telemetry-navigation-top > div.l-origin-hamburger', {
      visible: true,
    });
    await this.page.click('#shell > section > div > nav > div > div.origin-navigation-top.origin-telemetry-navigation-top > div.l-origin-hamburger');
    const nav = new Promise(res => this.browser.on('targetcreated', res));
    await this.page.click('#shell > section > div > nav > div > div:nth-child(5) > ul > li:nth-child(1) > origin-cta-login > origin-cta-primary > div > a');
    let pages = await nav.then(_ => this.browser.pages()); // TODO: 랜덤하게 페이지 이동을 기다리지 못하는 경우가 있음
    // console.log(pages);
    let popup = pages[pages.length - 1];
    // console.log(await popup.title());
    await popup.waitForSelector('#email', {
      visible: true,
    });
    await popup.type('#email', id);
    await popup.type('#password', pw);
    await popup.click('#logInBtn');
    await popup.reload();

    console.log(await popup.title());
    if (await popup.title() === "Login Verification") {
      if (env === "console") {
        await popup.click('#btnSendCode');
        let prom;
        for await (const line of rl) {
          await popup.type('#oneTimeCode', line);
          prom = await popup.click('#btnSubmit');
          break;
        }
      }
    }
  }

  getOwnedGame() {
    // TODO: 소유한 게임 가져오기
  }

  getRecentlyPlayed() {

  }

  getOriginPoint() {

  }

  getGameProgression(id) {
    // TODO: 게임 진행 정보
  }

  async shutdown() {
    await this.browser.close();
  }
}

module.exports = new OriginCrawler();