const fs = require('fs')
const path = require('path').resolve('./')
const defaults = {
  flags: 'w',
  encoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}

let filePath = process.argv[2]
let className = process.argv[3]
let fileName = ''
className.split('-').forEach(word => {
  fileName += word.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
})


const writeFile = (className, fileName, filePath) => {
  let content = 
  `<template lang="html">
  <div class="${className}">
    ${fileName}
  </div>
</template>
<script>
import { showMessage } from 'utils/message'
import { TablePagination, ContentBox } from 'views/console'
export default {
  name: '${fileName}',
  components: {
    TablePagination, ContentBox
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="css">
.${className} {

}
</style>
`
  
  let writeStream = fs.createWriteStream(`${path}/${filePath}/${fileName}.vue`, defaults)
  writeStream.write(content, 'utf-8', () => {
    console.log(`finish, created ${path}/${filePath}/${fileName}.vue`)
  })
}

writeFile(className, fileName, filePath)
