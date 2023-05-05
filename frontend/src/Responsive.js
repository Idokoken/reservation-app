import { css } from "styled-components";

export const Tablet = (props) => {
  return css`
    @media only screen and (min-width: 768px) {
      ${props}
    }
  `;
};
