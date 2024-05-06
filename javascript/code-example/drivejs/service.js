// service.js
const { google } = require('googleapis')
const path = require('path')

const dir = '/home/ilyas/project/chiasa/AutoRclone/accounts'
const getDriveService = () => {
  const KEYFILEPATH = path.join(
    dir,
    '002a13050181a38d33dd41d1c4d76bd95cfcea94.json'
  )
  const SCOPES = ['https://www.googleapis.com/auth/drive']

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
  })
  const driveService = google.drive({ version: 'v3', auth })
  return driveService
}

module.exports = getDriveService
