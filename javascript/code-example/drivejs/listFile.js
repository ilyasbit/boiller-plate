const fs = require('fs')
const drive = require('./service')

const getDirId = async () => {
  const driveService = drive()
  const res = await driveService.files.list({
    pageSize: 1,
    q: "mimeType='application/vnd.google-apps.folder'"
  })
  const file = res.data.files[0].id
  if (file) {
    return file
  } else {
    return 1
  }
}

;(async () => {
  const dirId = await getDirId()
  console.log(dirId)
})()
