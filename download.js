// download.js
const axios = require('axios');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const { Downloader } = require('soundcloud-downloader');
const { getTrack } = require('@distube/spotify');

// Função para baixar vídeos do YouTube
const downloadYouTube = async (url, path) => {
  try {
    const info = await ytdl.getInfo(url);
    const stream = ytdl(url, { filter: 'audioandvideo' });
    stream.pipe(fs.createWriteStream(path));  // Baixa e salva o arquivo
    console.log(`Baixando vídeo do YouTube: ${info.videoDetails.title}`);
  } catch (error) {
    console.error('Erro ao baixar do YouTube:', error);
  }
};

// Função para baixar áudio do Spotify
const downloadSpotify = async (url, path) => {
  try {
    const track = await getTrack(url);  // Obtém informações da música no Spotify
    const stream = track.download();  // Baixa o arquivo de áudio
    stream.pipe(fs.createWriteStream(path));
    console.log(`Baixando música do Spotify: ${track.name}`);
  } catch (error) {
    console.error('Erro ao baixar do Spotify:', error);
  }
};

// Função para baixar áudio do SoundCloud
const downloadSoundCloud = async (url, path) => {
  try {
    const track = await Downloader.getTrack(url);
    const stream = track.stream();
    stream.pipe(fs.createWriteStream(path));
    console.log(`Baixando áudio do SoundCloud: ${track.title}`);
  } catch (error) {
    console.error('Erro ao baixar do SoundCloud:', error);
  }
};

// Função para baixar do Mediafire
const downloadMediafire = async (url, path) => {
  try {
    const res = await axios.get(url);
    const fileUrl = res.data.match(/"direct_download_url":"(.*?)"/)[1];
    const file = await axios.get(fileUrl, { responseType: 'stream' });
    file.data.pipe(fs.createWriteStream(path));
    console.log('Baixando arquivo do Mediafire...');
  } catch (error) {
    console.error('Erro ao baixar do Mediafire:', error);
  }
};

// Função para baixar do Mega.nz
const downloadMega = async (url, path) => {
  // Mega.nz pode exigir autenticação ou outra abordagem que não seja trivial.
  // Aqui, usaremos a API de download se disponível (MegaApi.js ou outras bibliotecas de terceiros)
  try {
    // Exemplo de abordagem com MegaApi.js
    const mega = require('mega');
    const download = mega({ email: 'your_email', password: 'your_password' });
    const file = await download.get({ link: url });
    file.download(path);
    console.log('Baixando arquivo do Mega.nz...');
  } catch (error) {
    console.error('Erro ao baixar do Mega.nz:', error);
  }
};

// Função para baixar do Instagram
const downloadInstagram = async (url, path) => {
  // O Instagram tem proteção contra scraping e download direto
  // Usaremos uma API externa ou biblioteca para realizar o download
  try {
    const res = await axios.get(`https://api.insta-downloader.com/?url=${url}`);
    const mediaUrl = res.data.mediaUrl;
    const mediaRes = await axios.get(mediaUrl, { responseType: 'stream' });
    mediaRes.data.pipe(fs.createWriteStream(path));
    console.log('Baixando conteúdo do Instagram...');
  } catch (error) {
    console.error('Erro ao baixar do Instagram:', error);
  }
};

// Função para baixar do Facebook
const downloadFacebook = async (url, path) => {
  // Similar ao Instagram, o Facebook possui medidas de proteção
  try {
    const res = await axios.get(`https://api.fbdownloader.net/download?url=${url}`);
    const mediaUrl = res.data.video_url || res.data.audio_url;
    const mediaRes = await axios.get(mediaUrl, { responseType: 'stream' });
    mediaRes.data.pipe(fs.createWriteStream(path));
    console.log('Baixando conteúdo do Facebook...');
  } catch (error) {
    console.error('Erro ao baixar do Facebook:', error);
  }
};

// Função para fazer download de qualquer URL fornecida
const downloadFromUrl = async (url, path) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return downloadYouTube(url, path);
  } else if (url.includes('spotify.com')) {
    return downloadSpotify(url, path);
  } else if (url.includes('soundcloud.com')) {
    return downloadSoundCloud(url, path);
  } else if (url.includes('mediafire.com')) {
    return downloadMediafire(url, path);
  } else if (url.includes('mega.nz')) {
    return downloadMega(url, path);
  } else if (url.includes('instagram.com')) {
    return downloadInstagram(url, path);
  } else if (url.includes('facebook.com')) {
    return downloadFacebook(url, path);
  } else {
    console.log('Plataforma não suportada.');
  }
};

// Expondo a função de download como parte do módulo
module.exports = {
  downloadFromUrl
};
