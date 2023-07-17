const express = require('express');
const { fetcher } = require('../fetcher.js');

const app = express();
app.use(express.json());

// const MOCK_RESULT = ['https://test.com/f',
//                       'https://test.com/v',
//                       'https://test.com/a/h',
//                       'https://test.com/v/d',
//                       'https://test.com/v/e',
//                       'https://test.com/h',
//                       'https://test.com/h/v',
//                       'https://test.com/v/e/a',
//                       'https://test.com/v/e/v',
//                       'https://test.com/h/v/d',
//                       'https://test.com/h/v/d/a',
//                       'https://test.com/h/v/d/h'];

app.post('/parse', async (req, res) => {
  const { domainName } = req.body;

  if (!domainName) {
    res.status(400).send('Bad Request\n');
    return;
  }

  const foundUrls = [domainName];
  const visitedUrls = new Set();

  const queue = [domainName];

  try {
    while (queue.length > 0){
      const currentUrl = queue.shift();

      if (!visitedUrls.has(currentUrl)){
        visitedUrls.add(currentUrl);

        let response = await fetcher(currentUrl);

        if(response.status === 404){
          foundUrls.splice(foundUrls.indexOf(currentUrl), 1);
        }

        if(response.status === 200){
            const html = await response.text();
            const urls = extractUrls(html);

            urls.forEach((url) => {
              const absoluteUrl = new URL(url, currentUrl).href;

              if (!visitedUrls.has(absoluteUrl)) {
                if(!foundUrls.includes(absoluteUrl)) foundUrls.push(absoluteUrl);
                queue.push(absoluteUrl);
              }
            });
        }
        if (response.status >= 500){

          // for(let i = 0; i<2; i++){
            response = await fetcher(currentUrl);
            flag = (response.status == 200);
            const html = await response.text();
            const urls = extractUrls(html);
            console.log(urls);
            

            urls.forEach((url) => {
              const absoluteUrl = new URL(url, currentUrl).href;
              console.log(flag);
              console.log(!visitedUrls.has(absoluteUrl));
              if (!visitedUrls.has(absoluteUrl) && flag){
                if(!foundUrls.includes(absoluteUrl)){
                  foundUrls.push(absoluteUrl);
                  // queue.push(absoluteUrl);
                }
              }
            });

            if(!flag) foundUrls.splice(foundUrls.indexOf(currentUrl), 1);
          // }
          
        }
      }
    }
    // console.log('test', MOCK_RESULT.filter((val) => !foundUrls.includes(val)))
    res.send(foundUrls);
  } 
  catch (error){
    res.status(500).send('Internal Server Error');
    
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));

function extractUrls(html){
  const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
  const urls = [];
  let match;

  while((match = regex.exec(html)) !== null){
    const url = match[2];
    urls.push(url);
  }
  return urls;
}
