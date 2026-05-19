import { useSelector, useDispatch } from "react-redux"

import {
  increment,
  decrement,
  incrementByAmount,
} from "./features/counter/counterSlice"

function App() {
  // READ data from Redux store
  const count = useSelector((state) => state.counter.value)

  // SEND actions to Redux
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>{count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>
    </div>
  )
}

export default App