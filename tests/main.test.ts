import { writeFileSync } from "fs";
import getTableImage from "..";

describe("main", () => {
  it("generate image", async () => {
    const image = await getTableImage(
      {
        columns: ["Name", "Age"],
        rows: [
          [
            {
              value: "John",
            },
            {
              value: "25",
            },
          ],
        ],
      },
      {
        width: 600,
        scale: 3,
      }
    );

    writeFileSync(".cache/table.png", image);
  });
});
