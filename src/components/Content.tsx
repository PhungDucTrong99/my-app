import { Tabs, Layout } from "antd";
import BodyTabAnswered from "./BodyTabAnswered";
import BodyTabsQuestions from "./BodyTabQuestion";

const { Content } = Layout;
const { TabPane } = Tabs;

const ContentPage = () => {
  return (
    <Content className="site-layout">
      <div style={{ minHeight: 380 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="New Questions" key="1">
            <BodyTabsQuestions />
          </TabPane>
          <TabPane tab="Question Rated" key="2">
            <BodyTabAnswered />
          </TabPane>
        </Tabs>
      </div>
    </Content>
  );
};

export default ContentPage;
