const puppeteer = require("puppeteer");

class OriginCrawler {
  async init(id, pw) {
    this.browser = await puppeteer.launch({headless: false});
    this.page = await this.browser.newPage();
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