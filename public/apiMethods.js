async function sendAccel(norm){
    const options = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({accel: norm})
    }
    var response = await fetch('/bet', options)
    var response = await response.json()
    return(response)
}

