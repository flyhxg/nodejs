import { css } from 'styled-components'

export const commonStyles = {
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexEnd: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  flexStart: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  flexStartStart: css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  transition: css`
    transition: all 0.2s linear;
  `,
  bgImage: css`
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  `,

  scroll: css`
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      width: 6px;
      background: #eee;
      border-radius: 4px;
    }
  `,
  feedback: css`
    transition: all 0.2s linear;
    :hover {
      transform: translateY(-2px);
    }
  `,
  gridAutoFlow: css`
    display: grid;
    grid-template-columns: repeat(5, 206px);
    grid-gap: 15px 17px;
  `,
  domainName: css`
    font-family: Segoe UI emoji;
  `,
}
