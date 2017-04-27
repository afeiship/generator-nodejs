import request from 'request';

async function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve();
    }, timeout);
  });
};


async function fetchBaidu(timeout) {
  return new Promise((resolve, reject) => {
    request('http://www.baidu.com',(err,response,body)=>{
      resolve(body);
    })
  });
};



(async function () {
  console.log(__dirname);
  const result = await fetchBaidu();
  console.log(result);
  await sleep(3000);
  console.log('Do other things, ' + new Date());
})();
