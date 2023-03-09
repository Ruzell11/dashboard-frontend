import React from "react";

import ContentLayout from "../common/layouts/ContentLayout";
import SalesChartOverview from "../common/ChartsComponent/SalesChartOverview";

const Charts = () => {
  return (
    <ContentLayout>
      <div className="grid grid-cols-12 content-center ">
        <div className="col-span-12 md:col-span-6">
          <SalesChartOverview />
        </div>
        <div className="col-span-12 md:col-span-6">
          <SalesChartOverview />
        </div>
      </div>
    </ContentLayout>
  );
};
export default Charts;
