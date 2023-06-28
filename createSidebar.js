
const { log } = require('console');
const fs = require('fs');
const path = require('path')


let res = ''
/**
 * 配置文件
 */
const fileTemplateFun = (name,newpath,level=1)=>{

  const reg = /\W+/
  let isCh = !!name[0].match(reg)
  console.log(isCh);
  const arr =  name.split('.')
  const _name = path.basename(name,'.md')

  const newName = isCh ? 'a'+_name :_name
  const _resPath = newpath.replace('/workspaces/note/','')
  let res = Array(level).fill('*').join('')

  return `*${res} [${newName}](${_resPath})`
}

const dirTemFun = (name,newPath,level)=>{
  let res = Array(level).fill('*').join('')

  return `${res} [${name}](${newPath})`
}

const fileName = 'index.md';
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

let fileLevel = 0
function readDir(fileName='',parentPath='',dirLevel=0) {
  const dir = [];
  console.log( parentPath,111);
  const newPath = fileName? parentPath : process.cwd()
  const files = fs.readdirSync(newPath);

  files.forEach((file) => {



    if(!['.','_'].includes(file[0])){
      console.log(file,77878);
      if (isDir(file)) {

        dirLevel+=1
        fileLevel = 0
        res += dirTemFun(file,'',dirLevel)+ '\n'

        readDir( file, `${newPath}/${file}`);

      }else if(isMd(file)  ) {

        fileLevel =  dirLevel+1
        dirLevel=0

        res += fileTemplateFun(file,`${newPath}/${file}`,fileLevel) + '\n'

      }
    }

  });
  console.log(898989,res);

}


readDir()

writeFile(process.cwd(),res)
