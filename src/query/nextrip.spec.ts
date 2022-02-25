import {
  getRoutes,
  getRouteDirections,
  getStops,
  getDepartureInfo,
} from "./nextrip";

describe("nextrip query", () => {
  describe("getRoutes", () => {
    describe("the response is ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should return", async () => {
        const returnValue = await getRoutes();

        expect(returnValue).toEqual({ test: "Data" });
      });
    });

    describe("the response is not ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should error", async () => {
        await expect(getRoutes()).rejects.toThrow("Could not get routes");
      });
    });
  });

  describe("getRouteDirections", () => {
    describe("the response is ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should return", async () => {
        const returnValue = await getRouteDirections("id");

        expect(returnValue).toEqual({ test: "Data" });
      });
    });

    describe("the response is not ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should error", async () => {
        await expect(getRouteDirections("id")).rejects.toThrow(
          "Could not get directions"
        );
      });
    });
  });

  describe("getStops", () => {
    describe("the response is ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should return", async () => {
        const returnValue = await getStops("id", 0);

        expect(returnValue).toEqual({ test: "Data" });
      });
    });

    describe("the response is not ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should error", async () => {
        await expect(getStops("id", 0)).rejects.toThrow("Could not get stops");
      });
    });
  });

  describe("getDepartureInfo", () => {
    describe("the response is ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should return", async () => {
        const returnValue = await getDepartureInfo("id", 0, "id");

        expect(returnValue).toEqual({ test: "Data" });
      });
    });

    describe("the response is not ok", () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ test: "Data" }),
          })
        ) as jest.Mock;
      });

      it("should error", async () => {
        await expect(getDepartureInfo("id", 0, "id")).rejects.toThrow(
          "Could not get depatures"
        );
      });
    });
  });
});
