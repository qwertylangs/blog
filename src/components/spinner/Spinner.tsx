import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  const customLoading = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <Spin indicator={customLoading} />
    </div>
  );
};

export { Spinner };
