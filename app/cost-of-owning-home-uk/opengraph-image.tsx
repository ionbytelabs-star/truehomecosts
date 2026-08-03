import { ImageResponse } from "next/og";

import {
  freeholdAnnualTotal,
  freeholdMonthlyTotal,
  managedAnnualTotal,
  managedMonthlyTotal
} from "@/data/assumptions/ongoing-home-costs";

export const alt = "Monthly and annual UK homeownership budget examples for 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f6ef",
          color: "#12304a",
          padding: "70px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0d7a6f" }}>TrueHomeCosts</div>
          <div style={{ fontSize: 22, color: "#52616f" }}>UK guide · 2026</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, lineHeight: 1.08, fontWeight: 700, maxWidth: 970 }}>
            The ongoing cost of owning a home
          </div>
          <div style={{ display: "flex", marginTop: 42 }}>
            <div style={{ display: "flex", flexDirection: "column", width: "48%", borderLeft: "10px solid #0d7a6f", paddingLeft: 24 }}>
              <div style={{ fontSize: 24, color: "#52616f" }}>Freehold illustration</div>
              <div style={{ fontSize: 48, fontWeight: 700 }}>{`£${freeholdMonthlyTotal}/month`}</div>
              <div style={{ fontSize: 24, color: "#52616f" }}>{`£${freeholdAnnualTotal.toLocaleString("en-GB")}/year`}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "52%", borderLeft: "10px solid #12304a", paddingLeft: 24 }}>
              <div style={{ fontSize: 24, color: "#52616f" }}>Managed or leasehold illustration</div>
              <div style={{ fontSize: 48, fontWeight: 700 }}>{`£${managedMonthlyTotal}/month`}</div>
              <div style={{ fontSize: 24, color: "#52616f" }}>{`£${managedAnnualTotal.toLocaleString("en-GB")}/year`}</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 21, color: "#52616f" }}>
          Illustrative non-mortgage planning figures · mortgage repayments additional
        </div>
      </div>
    ),
    size
  );
}
