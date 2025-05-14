/**
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-02-20 15:16:23
 * @LastEditors : wwj 318348750@qq.com
 * @lastTime    : 2025-02-20 15:18:47
 * @Description : 预安装检查脚本，强制统一团队包管理工具‌，避免因使用不同管理器（如 npm/yarn）导致依赖版本冲突或项目异常
 * @copyright   : Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import chalk from "chalk";
import { morning } from "gradient-string";

if (!/pnpm/.test(process.env.npm_execpath || "")) {
  const title = morning.multiline(
    [
      "╭────────────────────────────────────╮",
      "	        │         PNPM 强制使用警告          │",
      "	        ╰────────────────────────────────────╯",
    ].join("\n"),
  );

  console.log(`
		${title}
		${chalk.hex("#FFD700").bold("⚠️  检测到非常规包管理器!")}
		${"\n"}
		${chalk.yellow("当前项目要求:")}
		 ${chalk.green("▸")} 使用 ${chalk.bold.green("pnpm")} 保证工作流
		 ${chalk.green("▸")} 原因: 幽灵依赖管控/安装提速
		${"\n"}
		${chalk.hex("#FFA500").italic("请运行: pnpm install")}
	`);

  process.exit(1);
}
