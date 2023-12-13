import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { javascript } from '@codemirror/lang-javascript';
import React, { useEffect, useState } from 'react'

type Props = {
  filePath: string
}

const CodeEditor = ({ filePath }: Props) => {

  const [data, setData] = useState('')

  useEffect(() => {
    fetch("http://localhost:3001/script/" + filePath)
      .then(res => res.text())
      .then(setData)
  }, [filePath])



  return (
    <CodeMirror
      value={data}
      height="63vh"
      theme={okaidia}
      extensions={[javascript({ jsx: true })]}
    />
  )
}

export default CodeEditor