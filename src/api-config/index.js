import axios from 'axios'

const url = 'https://stellar.truechain.pro/fabric'
const nodeServerUrl = 'https://stellar.truechain.pro/nodeserver'

export default {
  enroll (username, orgName) {
    let data = `username=${username}&orgName=${orgName}`
    return axios.post(url + '/users', data, {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    })
  },
  createChannel (channelName, channelConfigPath) {
    let data = {
      channelName,
      channelConfigPath
    }
    return axios.post(url + '/channels', data, {
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  joinChannel (channelName, peers) {
    let data = {
      peers
    }
    return axios.post(url + `/channels/${channelName}/peers`, data, {
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  // installChaincode (peers, chaincodeName, chaincodePath, chaincodeVersion) {
  //   let data = {
  //     peers,
  //     chaincodeName,
  //     chaincodePath,
  //     chaincodeVersion
  //   }
  //   return axios.post(url + '/chaincodes', data, {
  //     headers: {
  //       'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
  //       'content-type': 'application/json'
  //     }
  //   })
  // },
  installChaincode (chaincodeName, chaincodePath, chaincodeVersion) {
    let data = {
      username: window.cookieStorage.getItem('userName'),
      chaincodeName,
      chaincodePath,
      chaincodeVersion,
      token: window.cookieStorage.getItem('userToken')
    }
    return axios.post(nodeServerUrl + '/chaincodes', data)
  },
  // instantiateChaincode (channelName, chaincodeName, chaincodeVersion, args) {
  //   let data = {
  //     chaincodeName,
  //     chaincodeVersion,
  //     args
  //   }
  //   return axios.post(url + `/channels/${channelName}/chaincodes`, data, {
  //     headers: {
  //       'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
  //       'content-type': 'application/json'
  //     }
  //   })
  // },
  instantiateChaincode (channelName, chaincodeName, chaincodeVersion, args) {
    let data = {
      username: window.cookieStorage.getItem('userName'),
      channelName,
      chaincodeName,
      chaincodeVersion,
      args,
      token: window.cookieStorage.getItem('userToken')
    }
    return axios.post(nodeServerUrl + '/chaincodes/instantiate', data, {
      headers: {
        'content-type': 'application/json'
      }
    })
  },
  // invokeChaincode (channelName, chaincodeName, fcn, args) {
  //   let data = {
  //     fcn,
  //     args
  //   }
  //   return axios.post(url + `/channels/${channelName}/chaincodes/${chaincodeName}`, data, {
  //     headers: {
  //       'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
  //       'content-type': 'application/json'
  //     }
  //   })
  // },
  invokeChaincode (channelName, chaincodeName, fcn, args) {
    let data = {
      channelName,
      chaincodeName,
      token: window.cookieStorage.getItem('userToken'),
      data: {
        fcn,
        args
      }
    }
    return axios.post(nodeServerUrl + '/invoke', data, {
      headers: {
        'content-type': 'application/json'
      }
    })
  },
  queryChaincode (channelName, chaincodeName, peer, fcn, args) {
    return axios.get(url + `/channels/${channelName}/chaincodes/${chaincodeName}`, {
      params: {
        peer,
        fcn,
        args
      },
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  getBlock (channelName, blockNumber, peer) {
    return axios.get(url + `/channels/${channelName}/blocks/${blockNumber}`, {
      params: {
        peer
      },
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  getTransaction (channelName, transactionID, peer) {
    return axios.get(url + `/channels/${channelName}/transactions/${transactionID}`, {
      params: {
        peer
      },
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  getChainInfo (channelName, peer) {
    return axios.get(url + `/channels/${channelName}`, {
      params: {
        peer
      },
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  // queryChaincodes (peer, type) {
  //   return axios.get(url + '/chaincodes', {
  //     params: {
  //       peer,
  //       type // installed || instantiated
  //     },
  //     headers: {
  //       'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
  //       'content-type': 'application/json'
  //     }
  //   })
  // },
  queryChaincodes () {
    return axios.get(nodeServerUrl + '/chaincodes', {
      params: {username: window.cookieStorage.getItem('userName')}
    })
  },
  getChannels (peer) {
    return axios.get(url + '/channels', {
      params: {
        peer
      },
      headers: {
        'authorization': 'Bearer ' + window.cookieStorage.getItem('userToken'),
        'content-type': 'application/json'
      }
    })
  },
  uploadChaincode (fileName, file) {
    let formData = new FormData()
    formData.append('fileName', fileName)
    formData.append('filePath', fileName.split('.')[0])
    formData.append('file', file)
    return axios.post(nodeServerUrl + '/chaincode', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  login (username, password) {
    let data = `username=${username}&password=${password}`
    return axios.post(nodeServerUrl + '/auth', data, {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    })
  },
  signup (username, password, code) {
    return axios.post(nodeServerUrl + '/signup', {
      username,
      password,
      code
    })
  },
  getRecentTrans () {
    return axios.get(nodeServerUrl + '/transaction')
  },
  getRecentBlock () {
    return axios.get(nodeServerUrl + '/block')
  }
}
