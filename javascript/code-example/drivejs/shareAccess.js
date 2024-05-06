const drive = require('./service')
const { google } = require('googleapis')
const driveId = '1mQ2OuFgFd2OCJltXcms2IDBonumtYKVL'

const user = 'ilyasbit01@gmail.com'

const shareAccess = async () => {
  const driveService = drive()
  const res = await driveService.permissions.create({
    fileId: driveId,
    requestBody: {
      role: 'reader',
      type: 'user',
      emailAddress: user
    }
  })
  console.log(res.data)
}

shareAccess()
