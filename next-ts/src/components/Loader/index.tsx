import { Spin } from "antd";
import { useStyles } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

const Loader: React.FC = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.overlay}>
      <LoadingOutlined className={styles.loader} />
    </div>
  );
};

export default Loader;
