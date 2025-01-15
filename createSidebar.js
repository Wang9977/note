const fs = require('fs');
const path = require('path')


let res = ''
/**
 * 配置文件
 */
const fileTemplateFun = (name, newpath) => {

  const _name = path.basename(name, '.md');
  const newName = _name;
  const _resPath = newpath.replace(process.cwd() + '/', '');
  const level = _resPath.split('/').length;
  let res = Array(level).fill('*').join('');
  // console.log(22,newpath,_resPath);


  if(newName==='index') return ''

  return `${res} [${newName}](${_resPath})`;
};

const dirTemFun = (name, newPath) => {
  const _resPath = newPath.replace(process.cwd() + '/', '');
  const level = _resPath.split('/').length;
  let res = Array(level).fill('*').join('');
  const __resPath = _resPath!== name? _resPath : `${_resPath}/index.md`;
  // console.log(newPath, __resPath);

// console.log('11',`${res} [${name}](${__resPath})`);

  return `${res} [${name}](${__resPath})`;
}

const fileName = '_sidebar.md';
function isMd(file) {
  let arr = file.split('.')

  return  arr?.length && ['md','MD'].includes(arr[arr.length-1]);
}

function isDir(file){
  const len = file.split('.').length
  return len===1
}
/**
 * 写函数
 */
function writeFile(path, content) {
  fs.writeFile(`${path}/${fileName}`, content, (err) => {
    if (err) {
      console.log('创建失败');
    } else {
      console.log('创建成功');
    }
  });
}
/**
 * 读取目录函数
 */


let dirLevel = 0
function readDir(fileName = '', parentPath = '', dirLevel = 0) {
  const newPath = fileName ? parentPath : process.cwd();
  const files = fs.readdirSync(newPath);

  files.forEach((file, index) => {
    if (!['.', '_'].includes(file[0])) {
      if (isDir(file)) {

        let _path = `${newPath}/${file}`;



        res += dirTemFun(file, _path, dirLevel) + '\n';
        readDir(file, `${newPath}/${file}`);
      } else if (isMd(file)) {

          res += fileTemplateFun(file, `${newPath}/${file}`, dirLevel) + '\n';

      }
    }
  });
}

// 获取文件夹



readDir()

writeFile(process.cwd(),res)
