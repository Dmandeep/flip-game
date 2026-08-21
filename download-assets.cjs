const fs = require('fs');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'MemoryFlipBot/1.0 (https://github.com/dmandeep/flip-game) Node.js/20',
      }
    };
    
    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  console.log('Downloading reliable AOT Assets...');
  try {
    // Wall Background
    await download(
      'https://images.unsplash.com/photo-1542466500-dccb2789cbbb?q=80&w=2000',
      './public/home-bg.png'
    );
    console.log('Downloaded home-bg.png');
    
    // Survey Corps SVG
    await download(
      'https://upload.wikimedia.org/wikipedia/commons/d/d4/Legi%C3%B3n_de_Reconocimiento_%28Shingeki_no_Kyojin%29.svg',
      './public/survey-corps.svg'
    );
    console.log('Downloaded survey-corps.svg');
    
  } catch (err) {
    console.error('Error downloading:', err);
  }
}

run();
