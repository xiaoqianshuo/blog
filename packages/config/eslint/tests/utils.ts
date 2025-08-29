import { log } from 'node:console';
import type { Linter } from 'eslint';

/**
 * 检查自定义规则是否与 ESLint 推荐规则冲突
 * @param myRules 你的自定义规则（从 baseConfig 里拿出来）
 */
export function checkRules(myRules: Linter.RulesRecord = {}, recommendedRules: Linter.RulesRecord) {
  const duplicates: string[] = [];
  const unique: Record<string, unknown> = {};

  for (const [rule, setting] of Object.entries(myRules)) {
    if (rule in recommendedRules) {
      // 判断配置是否相同
      const recommendedSetting = JSON.stringify(recommendedRules[rule]);
      const mySetting = JSON.stringify(setting);

      if (recommendedSetting === mySetting) {
        duplicates.push(rule);
      } else {
        unique[rule] = setting;
      }
    } else {
      unique[rule] = setting;
    }
  }

  log('🔍 重复的规则（可删除）:\n', duplicates);
  log('\n✅ 建议保留的自定义规则:\n', unique);
}
