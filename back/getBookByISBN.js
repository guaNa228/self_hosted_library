const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

async function fetchData(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        // Adjust the encoding here based on the page's actual encoding
        const encoding = 'windows-1251'; // or 'UTF-8', or whichever encoding the page uses
        const data = iconv.decode(Buffer.from(response.data), encoding);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function getBookData(req, res) {
    const { isbn } = req.params;
    try {
        const url = `https://www.findbook.ru/search/d1?title=&authors=&publisher=&isbn=${isbn}&s=1`;
        const htmlData = await fetchData(url);
        if (htmlData) {
            const $ = cheerio.load(htmlData);
            const name = $('body > center:nth-child(6) > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > big').text();
            let author = $('body > center:nth-child(6) > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > small').text();
            if (name && author) {
                author = author.split('\n')[0].split(', ');
                const image_url = $('img[width="60"]').attr('src');
                return res.status(200).send({
                    name: name,
                    author: author.length == 3 ? `${author[1]} ${author[2]} ${author[0]}` : `${author[1]} ${author[0]}`.replace('undefined', '').trim(),
                    image_url: image_url,
                });
            } else {
                if ($('body > center:nth-child(5) > font').text() == "Книг не найдено") {
                    return res.status(404).send("Book not found!");
                } else {
                    return res.status(400).send("Incorrect ISBN!");
                }
            }
        } else {
            res.status(500).send("Book not found");
        }
    } catch (error) {
        console.error('Error getting book by ISBN', error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = getBookData;