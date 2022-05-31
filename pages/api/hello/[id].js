import apidata from '../../../components/data'

export default function handler(req, res) {
  // オブジェクトの分割代入（next用）
  const {query: {id}} = req

  res.json(apidata[id])
}