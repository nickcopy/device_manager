import { useState } from "react";
interface counterProps {
  aboutName: String;
  subName?: String;
  startDate: Number;
  amu?: {
    aaa: Number;
    ggg: String;
  };
}
export default function Counter(props: counterProps) {
  let [count, setCount] = useState(0);
  return (
    <div>
      <h2>카운터{count}</h2>
      <div>{props.aboutName}</div>
      <div>{props.startDate.toString()}</div>
      <button onClick={() => setCount(count++)}>+1</button>
      <button onClick={() => setCount(count--)}>-1</button>
    </div>
  );
}
