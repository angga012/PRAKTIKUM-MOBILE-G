import { Platform, StyleSheet } from "react-native";

const isWeb = Platform.OS === "web";

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: isWeb ? "#F1F5F9" : "#F8FAFC",
    alignItems: "center",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: isWeb ? 1600 : 900,
    backgroundColor: "#F8FAFC",
    alignSelf: "center",
    overflow: "hidden",
  },

  content: {
    width: "100%",
    maxWidth: isWeb ? 1450 : 900,
    alignSelf: "center",
    paddingTop: isWeb ? 36 : 24,
    paddingHorizontal: isWeb ? 32 : 16,
    paddingBottom: 112,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    gap: 16,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 6,
  },

  welcome: {
    fontSize: isWeb ? 26 : 20,
    fontWeight: "700",
    color: "#172033",
    maxWidth: 520,
    lineHeight: isWeb ? 34 : 27,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  banner: {
    backgroundColor: "#1D4ED8",
    borderRadius: 22,
    padding: isWeb ? 30 : 20,
    minHeight: isWeb ? 176 : 140,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
    overflow: "hidden",
  },

  bannerText: {
    flex: 1,
    paddingRight: isWeb ? 24 : 14,
  },

  bannerTitle: {
    fontSize: isWeb ? 28 : 21,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  bannerSubtitle: {
    fontSize: isWeb ? 15 : 12,
    lineHeight: isWeb ? 23 : 19,
    color: "#DBEAFE",
    maxWidth: 500,
  },

  bannerIcon: {
    width: isWeb ? 82 : 62,
    height: isWeb ? 82 : 62,
    borderRadius: 22,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },

  summaryCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: isWeb ? 18 : 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryIcon: {
    width: isWeb ? 42 : 34,
    height: isWeb ? 42 : 34,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: isWeb ? 10 : 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryNumber: {
    fontSize: isWeb ? 16 : 14,
    fontWeight: "700",
    color: "#172033",
  },

  summaryLabel: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: isWeb ? 24 : 20,
    fontWeight: "700",
    color: "#172033",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  totalAlat: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 2,
  },

  alatGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: isWeb ? 18 : 0,
  },

  alatItem: {
    width: isWeb ? "23%" : "48%",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: isWeb ? 900 : 900,
    height: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: isWeb ? 160 : 72,
    alignSelf: "center",
  },

  navItem: {
    width: 88,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  navActive: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
    marginTop: 3,
  },

  navText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },
});
