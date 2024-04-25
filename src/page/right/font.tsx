import { useState } from 'react'


const Font = () => {
  const [fontFamily, setFontFamily] = useState('dingTalkFont') // 默认字体

  return (
    <div>
      <div style={{ fontFamily: fontFamily }}>
        <p>【样例文字，当前字体】：{fontFamily}</p>
      </div>
      <button onClick={() => setFontFamily('alibabaPuHuiTiFont')}>DingTalk 字体</button>
      <button onClick={() => setFontFamily('kingsoftFont')}>Kingsoft 字体</button>
      {/* ...其他字体的按钮... */}
    </div>
  )
}

export default Font
