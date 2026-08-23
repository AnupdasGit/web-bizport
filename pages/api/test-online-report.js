import { whatsappApi } from "../../lib/apiClient";

const reportRequest = {
//   sql: " EXEC [dbo].[ONLINEREPORT] @REPID = N'9', @sCompNo = N'0', @YearCode =  N'2026', @StartDate = N'2026-08-23', @EndDate = N'2026-08-24', @AvailableReports = N' ', @AvailableStores = N' '",
//   dbName: "srv2019",
//   dbPassword: "maxx$12345",
//   dbUsername: "sa",
//   dbInstanceName: "SQLEXPRESSONLINE",
//   dbPortNumber: "49759",
//   dbServer: "111.92.85.211",
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await whatsappApi.testOnlineReport(reportRequest);

    return res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 502;
    const data = error.response?.data;
    return res.status(status).json(
      data && typeof data === "object"
        ? data
        : { message: data || error.message || "Report request failed" }
    );
  }
}