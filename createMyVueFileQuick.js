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
    <content-box :titles="titles">
      <div slot="monitor-contact">
        ${fileName}
        <el-table :data="${fileName}.tableData" v-loading="${fileName}.tableDataLoading" border>
        </el-table>
        <table-pagination :handleCurrentChange="get${fileName}" :pageConfig="${fileName}.pageConfig"></table-pagination>
      </div>
    </content-box>
  </div>
</template>
<script>
import { showMessage } from 'utils/message'
import { TablePagination, ContentBox } from 'views/console'
import { get${fileName} } from ''
export default {
  name: '${fileName}',
  components: {
    TablePagination, ContentBox
  },
  data () {
    return {
      titles: [
        {
          title: '${fileName}',
          slotName: '${className}'
        }
      ],
      ${fileName}: {
        searchData: {},
        tableData: [],
        tableDataLoading: true,
        pageConfig: {
          curPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    get${fileName} (curPage) {
      this.${fileName}.tableDataLoading = true
      this.${fileName}.searchData.curPage = curPage || this.${fileName}.pageConfig.curPage
      get${fileName}(this.${fileName}.searchData).then(data => {
        if (data.success) {
          this.${fileName}.tableData = data.results
          this.${fileName}.pageConfig.curPage = data.curPage
          this.${fileName}.pageConfig.total = data.count
          this.${fileName}.tableDataLoading = false
        } else {
          showMessage('error', data.message)
        }
      })
    }
  },
  mounted () {
    this.get${fileName}()
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
