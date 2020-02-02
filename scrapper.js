const axios = require("axios");
const cheerio = require("cheerio");
const sources = require("./assets/json/source");

module.exports = {
  async scrapSite(keyword = "") {
    let result = [];
    for (let index = 0; index < sources.length; index += 1) {
      const source = sources[index];
      const { url, parent, target = "", name } = source;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      $(parent).each((idx, el) => {
        let link,
          title = "";
        if (!!target) {
          link = $(el)
            .find("a")
            .attr("href");
          title = $(el)
            .find(target)
            .text();
        } else {
          title = $(el).text();
          link = $(el).attr("href");
        }

        if (link.charAt(0) == "/") link = link.replace("/", url + "/");
        if (!!keyword) {
          if (title.toLowerCase().includes(keyword)) {
            result.push({
              source: name,
              title,
              link
            });
          }
        } else {
          result.push({
            source: name,
            title,
            link
          });
        }
      });
    }

    return result;
  },
  foo() {}
};
