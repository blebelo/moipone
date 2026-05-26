import { CSSProperties, useId } from "react";
import { useStyles } from "./style";

interface LoaderProps {
  inline?: boolean;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ inline = false, size }) => {
  const { styles, cx } = useStyles();
  const maskId = useId().replace(/:/g, "");
  const scale = inline && size ? Math.max(size / 100, 0.1) : 1;
  const loaderStyle = {
    "--loader-size": `${scale}`,
  } as CSSProperties;

  const boxMaskStyle = {
    mask: `url(#${maskId})`,
    WebkitMask: `url(#${maskId})`,
  } as CSSProperties;

  const spinner = (
    <div
      className={cx(styles.loaderRoot, inline && styles.loaderInline)}
      style={loaderStyle}
      aria-hidden="true"
    >
      <svg
        className={styles.loaderSvg}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <defs>
          <mask id={maskId} className={styles.loaderMask}>
            <polygon points="0,0 100,0 100,100 0,100" fill="black" />
            <polygon points="25,25 75,25 50,75" fill="white" />
            <polygon points="50,25 75,75 25,75" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
          </mask>
        </defs>
      </svg>
      <div className={styles.loaderBox} style={boxMaskStyle} />
    </div>
  );

  if (inline) {
    return spinner;
  }

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      {spinner}
    </div>
  );
};

export default Loader;
