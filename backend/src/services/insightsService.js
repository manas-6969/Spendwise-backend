import { percentage, money } from '../utils/financial.js';
export function generateInsights({ expenses, allowance, budgets, previousTotal }) {
  const total = money(expenses.reduce((sum, e) => sum + Number(e.amount), 0)); const byCategory = {};
  expenses.forEach(e => { const name = e.categories?.name || 'Other'; byCategory[name] = money((byCategory[name] || 0) + Number(e.amount)); });
  const insights = Object.entries(byCategory).flatMap(([name, amount]) => {
    const share = percentage(amount, total); return share >= 30 ? [{ insight_type: 'category_share', message: `${name} accounts for ${share}% of this month's spending. Consider a weekly ${name.toLowerCase()} limit if it helps your priorities.` }] : [];
  });
  if (previousTotal && total > previousTotal * 1.2) insights.push({ insight_type: 'comparison', message: `This month's spending is higher than last month. Review recent purchases and decide which ones still fit your plans.` });
  budgets.forEach(b => { const spent = b.category_id ? expenses.filter(e => e.category_id === b.category_id).reduce((s, e) => s + Number(e.amount), 0) : total; const used = percentage(spent, b.monthly_limit); if (used >= 75) insights.push({ insight_type: 'budget', message: `You have used ${used}% of your ${b.categories?.name || 'monthly'} budget. Check the remaining amount before the next purchase.` }); });
  const remaining = money(Number(allowance || 0) - total); if (remaining > 0) insights.push({ insight_type: 'remaining_balance', message: `You have ${remaining} left from your allowance. You could allocate a portion to a current savings goal.` });
  return insights.length ? insights : [{ insight_type: 'positive', message: 'Add a few expenses to receive clear, personalised spending observations.' }];
}
