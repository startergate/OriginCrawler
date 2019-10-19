const puppeteer = require("puppeteer");

class OriginCrawler {
  async init(id, pw) {
    this.browser = await puppeteer.launch({headless: false});
    this.page = await this.browser.newPage();
    await this.page.goto("https://www.origin.com/kor/en-us/store");
    await this.page.waitForSelector('#shell > section > div > nav > div > div.origin-navigation-top.origin-telemetry-navigation-top > div.l-origin-hamburger', {
      visible: true,
    });
    await this.page.click('#shell > section > div > nav > div > div.origin-navigation-top.origin-telemetry-navigation-top > div.l-origin-hamburger');
    await this.page.click('#shell > section > div > nav > div > div:nth-child(5) > ul > li:nth-child(1) > origin-cta-login > origin-cta-primary > div > a');
    let pages = await this.browser.pages();
    let popup = pages[pages.length - 1];

    await this.page.waitForSelector('#email', {
      visible: true,
    });
    await popup.click('#email');
    await popup.type('#email', id);
    await popup.type('#password', id)
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