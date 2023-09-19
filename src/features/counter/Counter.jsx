import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./counterSlice";
function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <section>
      <p>Count: {count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </section>
  );
}

export default Counter;
