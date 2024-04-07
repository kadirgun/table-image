import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

export type RowRecord = {
  color?: string;
  value: string;
};

export type TableData = {
  columns: string[];
  rows: RowRecord[][];
};

export type Options = {
  width?: number;
  height?: number;
};

export async function getTableImage(data: TableData, options: Options = {}): Promise<Buffer> {
  const url = `https://table-generator.kadirgun.com/#${btoa(JSON.stringify(data))}`;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.setViewport({ width: options.width || 800, height: options.height || 600 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const image = await page.screenshot({ fullPage: true });
  await browser.close();

  return image;
}

export default getTableImage;
