const fs = require('fs');
const superAgent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject('File not found on read');
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf8', (err) => {
      if (err) {
        reject('File not found on write');
      } else {
        resolve('success');
      }
    });
  });
};

const fileName = __dirname + '\\dog.txt';

const getDogPic = async () => {
  try {
    console.log('4');
    const data = await readFilePro(fileName);
    console.log(`Breed: ${data}`);
    const resPromise1 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const resPromise2 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const resPromise3 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const all = await Promise.all([resPromise1, resPromise2, resPromise3]);
    const images = all.map((element) => element.body.message);
    console.log(images);

    await writeFilePro(__dirname + '\\dog-image.txt', images.join('\n'));
  } catch (err) {
    console.log(err);
    throw err;
  }
  console.log('3');
  return '5';
};

(async () => {
  try {
    console.log('10');
    const x = await getDogPic();
    console.log(40);
    console.log(x);
  } catch (err) {
    console.log('WE GOT AN ERROR: ' + err);
    throw err;
  }
})();

// console.log('1');
// getDogPic()
//   .then((x) => {
//     console.log(6);
//     console.log(x);
//   })
//   .catch((err) => {
//     console.log('WE GOT AN ERROR: ' + err);
//   });
// console.log('2');

/*
readFilePro(fileName)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro(__dirname + '\\dog-image.txt', res.body.message);
  })
  .then(() => {
    console.log('saved to file');
  })
  .catch((err) => {
    console.log(err);
  });
*/
