import React, { useState } from "react";

// ※ ステートとして作成した関数の中の定数は初期化されずに保存される？ 例：key

// Persitsはローカルストレージの値とそれを更新する関数を返す

// キーと初期値を受け取って、ステートとストレージの値を変更する関数を返す
function usePersist(ky, initVal) {
  const key = "hooks:" + ky

  // キーに値があればオブジェクトを返し、なければ引数で受け取った値を返す
  const value = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initVal
    } catch (err) {
      console.log(err)
      return initVal;
    }
  }

  // 引数で受けとった値をsavedValueにセットして、ローカルストレージに値をセット
  const setValue = (val) => {
    try {
      setSavedValue(val)
      window.localStorage.setItem(key, JSON.stringify(val))
    } catch(err) {
      console.log(err)
    }
  }

  const [savedValue, setSavedValue] = useState(value)
  return [savedValue, setValue]
}

export default usePersist