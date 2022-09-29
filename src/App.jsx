import { useState } from 'react'
import * as Icons from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'

function App() {
  let [count, setCount] = useState(1)
  let [ref, { width }] = useMeasure()
  let prev = usePrevious(count)

  // let direction = count > prev ? 'increasing' : 'decreasing'
  let direction = count > prev ? 1 : -1

  return (
    <div className="text-slate-300">
      <div className="mt-60 flex justify-center">
        <button onClick={() => setCount(count - 1)}>
          <Icons.ChevronLeftIcon className="w-10 h-10 mx-2" />
        </button>
        <div
          ref={ref}
          className="flex w-1/2 h-44 bg-gray-700 rounded-xl items-center justify-center overflow-hidden relative"
        >
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={{ direction, width }}
              className={`w-40 h-40 rounded-xl flex items-center justify-center absolute ${
                colors[Math.abs(count) % 4]
              }`}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => setCount(count + 1)}>
          <Icons.ChevronRightIcon className="w-10 h-10 mx-2" />
        </button>
      </div>
    </div>
  )
}

let colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500']

let variants = {
  // enter: (direction) => ({ x: direction === 'increasing' ? 100 : -100 }),
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  // exit: (direction) => ({ x: direction === 'increasing' ? -100 : 100 }),
  exit: ({ direction, width }) => ({ x: direction * -width }),
}

function usePrevious(state) {
  let [tuple, setTuple = useState] = useState([null, state]) // [ prev, current ]

  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }

  return tuple[0]
}

export default App
