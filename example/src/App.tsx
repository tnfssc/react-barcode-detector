import React from 'react'

import BarDetect from 'react-barcode-detector'
import 'react-barcode-detector/dist/index.css'

const App = () => {
  return (
    <div>
      <BarDetect freq={200} style={{ width: "100%" }} />
    </div>
  )
}

export default App
