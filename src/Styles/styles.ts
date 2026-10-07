import { Platform, StyleSheet } from "react-native";

const isWeb = Platform.OS === "web";

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: isWeb ? "#F1F5F9" : "#FFFFFF",
    alignItems: "center",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: isWeb ? undefined : 390,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    overflow: "hidden",
  },

  content: {
    width: "100%",
    maxWidth: isWeb ? 1500 : 390,
    alignSelf: "center",
    paddingTop: isWeb ? 35 : 24,
    paddingHorizontal: isWeb ? 40 : 16,
    paddingBottom: 105,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 5,
  },

  welcome: {
    fontSize: isWeb ? 25 : 19,
    fontWeight: "bold",
    color: "#172033",
    maxWidth: 500,
    lineHeight: isWeb ? 32 : 25,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: isWeb ? 28 : 18,
    minHeight: isWeb ? 170 : 135,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  bannerText: {
    flex: 1,
    paddingRight: 20,
  },

  bannerTitle: {
    fontSize: isWeb ? 28 : 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  bannerSubtitle: {
    fontSize: isWeb ? 15 : 12,
    lineHeight: isWeb ? 23 : 18,
    color: "#DBEAFE",
    maxWidth: 500,
  },

  bannerIcon: {
    width: isWeb ? 80 : 65,
    height: isWeb ? 80 : 65,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 30,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    padding: isWeb ? 18 : 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#172033",
  },

  summaryLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: isWeb ? 24 : 20,
    fontWeight: "bold",
    color: "#172033",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  totalAlat: {
    fontSize: 12,
    fontWeight: "600",
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
    width: isWeb ? "23.5%" : "48%",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: isWeb ? 1200 : 390,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: isWeb ? 500 : 100,
  },

  navItem: {
    width: 90,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  navActive: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 3,
  },

  navText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },
});
