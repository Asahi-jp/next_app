import { useState, useEffect } from "react";
import usePersist from "./Persist";

export default function Calc(props) {
  const [message, setMessage] = useState('')
  const [input, setInput] = useState('')
  const [data, setData] = usePersist('calc-history', [])
  const [func, setFunc] = useState({func: {}})

  // フェッチ関数
  const fetchFunc = (address) =>
    fetch(address).then(res => res.json())

  // 関数データをセット
  useEffect(() => {
    fetchFunc('/api/func').then((r) => {
      setFunc(r)
    })
  }, [data])

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      doAction(e)
    }
  }

  // Enter時の処理
  const doAction = (e) => {
    // eval:文字列をプログラムとして評価
    const res = eval(input)
    setMessage(res)
    // unshift:配列の先頭に要素を追加
    // 式 = 計算結果
    data.unshift(input + ' = ' + res)
    setData(data)
    setInput('')
  }

  // 履歴のクリア
  const clear = (e) => {
    setData([])
    setMessage('Clear history.')
  }

  // 関数ボタンの処理
  const doFunc = (e) => {
    const arr = input.split(',') // 
    const fid = e.target.id // 関数名
    const f = func.func[fid] // 指定された関数
    const fe = eval(f.function) // 関数式
    const res = fe(...arr) // 関数の結果を取得
    setMessage(res)
    data.unshift(fid + ' = ' + res)
    setData(data)
    setInput('')
  }

  // func.func = { ['tax', {}], 'tax2': {}, 'total': {}, 'factorial': {}, }
  // value = ['tax', {}]

  return (
    <div>
      <div className="alert alert-primary">
        <h5>Result: {message}</h5>
        <div className="form-group">
          <input type="text" value={input} className="form-control" onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        {Object.entries(func.func).map((value, key) => (
          <button className="btn btn-secondary m-1" key={key} title={value[1].caption} id={value[0]} onClick={doFunc} >{value[0]}</button>
        ))}
        <table className="table">
          <thead><tr><th>Histroy:</th></tr></thead>
          <tbody>
            {data.map((value, key) => (
              <tr key={key}><td>{value}</td></tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-warning" onClick={clear}>
          Clear History
        </button>
      </div>
    </div>
  )
}