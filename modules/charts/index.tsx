import React from "react";

import ContentLayout from "../common/layouts/ContentLayout";
import SalesChartOverview from "../common/ChartsComponent/SalesChartOverview";
import LeadsChartOverview from "../common/ChartsComponent/LeadsChartOverview";

const Charts = () => {
  return (
    <ContentLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <SalesChartOverview />
        </div>
        <div className="col-span-6">
          <LeadsChartOverview />
        </div>
      </div>
    </ContentLayout>
  );
};
export default Charts;
