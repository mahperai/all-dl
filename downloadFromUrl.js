const downloadModule = require('./download');

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';  // Exemplo de URL
const path = './video.mp4';

downloadModule.downloadFromUrl(url, path)
  .then(() => {
    console.log('Download concluído!');
  })
  .catch(error => {
    console.error('Erro durante o download:', error);
  });
