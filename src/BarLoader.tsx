/** @jsxImportSource @emotion/react */
import * as React from "react";
import { keyframes, css, SerializedStyles } from "@emotion/react";

import { calculateRgba, heightWidthDefaults, cssValue } from "./helpers";
import { LoaderHeightWidthProps } from "./interfaces";

const long = keyframes`
  0% {left: -35%;right: 100%}
  60% {left: 100%;right: -90%}
  100% {left: 100%;right: -90%}
`;

const short = keyframes`
  0% {left: -200%;right: 100%}
  60% {left: 107%;right: -8%}
  100% {left: 107%;right: -8%}
`;

class Loader extends React.PureComponent<Required<LoaderHeightWidthProps>> {
  public static defaultProps = heightWidthDefaults(4, 100);

  public style = (i: number): SerializedStyles => {
    const { height, color, speedMultiplier } = this.props;

    return css`
      position: absolute;
      height: ${cssValue(height)};
      overflow: hidden;
      background-color: ${color};
      background-clip: padding-box;
      display: block;
      border-radius: 2px;
      will-change: left, right;
      animation-fill-mode: forwards;
      animation: ${i === 1 ? long : short} ${2.1 / speedMultiplier}s ${i === 2 ? `${1.15 / speedMultiplier}s` : ""}
        ${i === 1 ? "cubic-bezier(0.65, 0.815, 0.735, 0.395)" : "cubic-bezier(0.165, 0.84, 0.44, 1)"} infinite;
    `;
  };

  public wrapper = (): SerializedStyles => {
    const { width, height, color } = this.props;

    return css`
      position: relative;
      width: ${cssValue(width)};
      height: ${cssValue(height)};
      overflow: hidden;
      background-color: ${calculateRgba(color, 0.2)};
      background-clip: padding-box;
    `;
  };

  public render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? (
      <span css={[this.wrapper(), css]}>
        <span css={this.style(1)} />
        <span css={this.style(2)} />
      </span>
    ) : null;
  }
}

export default Loader;
