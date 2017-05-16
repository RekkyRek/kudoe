const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let welcomewin
let documentwin = []

function createWelcome () {
  welcomewin = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false
  })

  welcomewin.loadURL(url.format({
    pathname: path.join(__dirname, '/app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  welcomewin.on('closed', () => {
    welcomewin = null
  })
}

function createDocumentWindow () {
  const i = documentwin.length;
  documentwin[i] = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false
  })

  documentwin[i].loadURL(url.format({
    pathname: path.join(__dirname, '/app/editor.html'),
    protocol: 'file:',
    slashes: true
  }))

  documentwin[i].on('closed', () => {
    documentwin[i] = null
  })
}

app.on('ready', createWelcome)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

exports.createDocument = () => createDocumentWindow();
