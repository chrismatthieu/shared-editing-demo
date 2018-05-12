const IPFS = require('ipfs')
const Y = require('yjs')
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-ipfs-connector')(Y)

function repo () {
  return 'ipfs/yjs-demo/' + Math.random()
}

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true
  }
})

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }

  console.log('IPFS node ready with address ' + info.id)

  Y({
    db: {
      name: 'memory'
    },
    connector: {
      name: 'ipfs',
      room: 'Textarea-example-dev',
      ipfs: ipfs
    },
    share: {
      textarea: 'Text'
    }
  }).then((y) => {
    y.share.textarea.bind(document.getElementById('textfield'))
  })

}))
