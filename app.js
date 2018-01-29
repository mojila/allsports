var request = require("request");
var proxy = require('./proxylist.js');

var proxyRand = () => {
  var text = "";
  var possible = "0123456789";
  
  for (var i = 0; i < 1; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return 'http://' + proxy[text].ip + ':' + proxy[text].port;
};

// Random
var rand = (option) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (option == 'address') {
    for (var i = 0; i < 41; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  } else if (option == 'telegram') {
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return (option == 'address' ? '0x':'t.me/')+text;
};

var config = {
  // Link Referral
  ref: 'https://drop.allsportschain.com/EN/index?r=471b7bbe'
};

var data = {
  addr: rand('address'),
  sns: rand('telegram')
};

var send = (addr, sns, proxy) => {
  try {
    request({
      proxy: proxy,
      method: 'POST',
      url: 'https://drop.allsportschain.com/inner/recorder/submit',
      headers: {
        'Cache-Control': 'no-cache',
        Referer: config.ref,
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      },
      formData: {
        addr: addr,
        sns: sns
      }
    }, function (error, response, body) {
      if (error) throw new Error(error);
  
      return '';
    });
  
    return 'Sukses, proxy : ' + proxy;
  } catch(e) {
    return 'Gagal, proxy : ' + proxy;
  }
};

setInterval(() => {
  console.log(send(rand('address'), rand('telegram'), proxyRand()));
}, 5000);
