import { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`

const run = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
`

const wordsLoop = keyframes`

  0%{

    transform:translateX(200px);

    -webkit-transform:translateX(200px);

  }

  100%{

    transform:translateX(-100%);

    -webkit-transform:translateX(-100%);

}
`

export const Keyframes = {
  rotate,
  run,
  wordsLoop,
}
