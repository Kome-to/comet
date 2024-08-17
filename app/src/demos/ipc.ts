
window.ipcRenderer.on('get/is-maximized', (_event, ...args) => {
  console.log('maximize:', ...args)
})
