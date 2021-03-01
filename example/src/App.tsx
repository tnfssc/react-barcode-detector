import React, { useState } from 'react'

import { BarDetect, ValidFreq, validFreq } from 'react-barcode-detector'

const normalizeFreq = (freq: ValidFreq): ValidFreq => {
  if (freq < 100) return 100
  return freq
}

const App = () => {
  const [rageMode, setRageMode] = useState(false)
  const [freq, setFreq] = useState<ValidFreq>(200)
  const [lastDetected, setLastDetected] = useState<string | null>(null)

  return (
    <div>
      <div>
        <BarDetect
          onDetect={setLastDetected}
          rageMode={rageMode}
          freq={normalizeFreq(freq)}
          style={{ width: '100%' }}
        />
      </div>
      <label>
        RageMode:
        <input
          type='checkbox'
          checked={rageMode}
          onChange={(e) => setRageMode(e.target.checked)}
        />
      </label>
      <label>
        Freq
        <select
          value={freq}
          disabled={rageMode}
          // @ts-ignore
          onChange={(e) => setFreq(normalizeFreq(parseInt(e.target.value)))}
        >
          {validFreq.map((fre) => (
            <option value={fre} key={fre}>
              {fre}
            </option>
          ))}
        </select>
      </label>
      <input
        type='text'
        value={`${lastDetected}`}
        onChange={(e) => e.preventDefault()}
      />
    </div>
  )
}

export default App
