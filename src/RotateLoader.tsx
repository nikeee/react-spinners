/** @jsxImportSource @emotion/react */
import * as React from "react";
import { keyframes, css, SerializedStyles } from "@emotion/react";

import { sizeMarginDefaults, cssValue, parseLengthAndUnit } from "./helpers";
import { LoaderSizeMarginProps } from "./interfaces";

const rotate = keyframes`
  0% {transform: rotate(0deg)}
  50% {transform: rotate(180deg)}
  100% {transform: rotate(360deg)}
`;

class Loader extends React.PureComponent<Required<LoaderSizeMarginProps>> {
  public static defaultProps = sizeMarginDefaults(15);

  public style = (i: number): SerializedStyles => {
    const { margin } = this.props;
    const { value, unit } = parseLengthAndUnit(margin);
    const left = (i % 2 ? -1 : 1) * (26 + value);

    return css`
      opacity: 0.8;
      position: absolute;
      top: 0;
      left: ${left}${unit};
    `;
  };

  public ball = (): SerializedStyles => {
    const { color, size } = this.props;

    return css`
      background-color: ${color};
      width: ${cssValue(size)};
      height: ${cssValue(size)};
      border-radius: 100%;
    `;
  };

  public wrapper = (): SerializedStyles => {
    const { speedMultiplier } = this.props;
    return css`
      ${this.ball()};
      display: inline-block;
      position: relative;
      animation-fill-mode: both;
      animation: ${rotate} ${1 / speedMultiplier}s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);
    `;
  };

  public long = (): SerializedStyles => css`
    ${this.ball()};
    ${this.style(1)};
  `;
  public short = (): SerializedStyles => css`
    ${this.ball()};
    ${this.style(2)};
  `;

  public render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? (
      <span css={[this.wrapper(), css]}>
        <span css={this.long()} />
        <span css={this.short()} />
      </span>
    ) : null;
  }
}

export default Loader;
