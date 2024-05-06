const { google } = require('googleapis')
const fs = require('fs').promises
const path = require('path')

const getDriveService = (fullPath) => {
  const KEYFILEPATH = fullPath
  const SCOPES = ['https://www.googleapis.com/auth/drive']

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
  })
  const driveService = google.drive({ version: 'v3', auth })
  return driveService
}

const shareAccess = async (fullPath, driveId, email) => {
  const driveService = getDriveService(fullPath)
  try {
    const res = await driveService.permissions.create({
      fileId: driveId,
      requestBody: {
        role: 'reader',
        type: 'user',
        emailAddress: email
      }
    })
    console.log(res.data)
  } catch (error) {
    console.error(error.message)
  }
}

//list all json file in the folder
const getFileArray = async (folderPath) => {
  const files = await fs.readdir(folderPath)
  return files.filter((file) => file.endsWith('.json'))
}

const getDirId = async (fullPath) => {
  const driveService = getDriveService(fullPath)
  const res = await driveService.files.list({
    pageSize: 1,
    q: "mimeType='application/vnd.google-apps.folder'"
  })
  if (!res.data.files.length) {
    return 1
  }
  const file = res.data.files[0].id
  if (file) {
    return file
  } else {
    return 1
  }
}

;(async () => {
  const dirPath = '/home/AutoRclone/accounts'
  const files = await getFileArray(dirPath)
  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    const driveId = await getDirId(fullPath)
    if (driveId === 1) {
      console.log(`${file} Folder not found`)
      continue
    }
    const email =
      'mfc-ry4iliicqct7l1eup42hb80bei@saf-fv-6hs4crw75d7ihnv089y31po.iam.gserviceaccount.com'
    console.log(`Sharing access from ${file}, id ${driveId} to: ${email}`)
    await shareAccess(fullPath, driveId, email)
  }
})()
