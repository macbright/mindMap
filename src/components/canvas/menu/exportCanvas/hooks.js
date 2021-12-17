


export const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

const removeString = (string) => {
  // const newData = {
  //   "menu": {
  //     "id": data.menu.id,
  //     "value": data.menu.value,
  //     "popup": data.menu.popup,
  //   }
  // }
  // return newData;
  // const newData = 
  
  console.log(string.replace(/\\\//g, "/"))

  return string.replace(/\\\//g, "/");
}

export const escapeString = (data) => {
  const newData = []
   data.forEach((ele) => {
    let newEle = {
      JSONOutput: removeString(ele.JSONOutput),
      ShapeId: ele.ShapeId,
      ShapeName: ele.ShapeName,
    }
    newData.push(newEle)
    
  })
  return newData;
}

