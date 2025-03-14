import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 异步模拟睡眠函数
 * @param ms 异步模拟睡眠时间（毫秒）
 * @returns Promise<void>
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 生成随机整数
 * @param start 最小值
 * @param end 最大值
 * @returns 随机整数
 */
export function randomInt(start: number, end?: number) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
