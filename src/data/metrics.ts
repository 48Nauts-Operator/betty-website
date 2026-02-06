export interface Metric {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export const metrics: Metric[] = [
  { value: 47, suffix: "K+", label: "Knowledge Items" },
  { value: 50, suffix: "ms", label: "Response Time" },
  { value: 90, suffix: "%", label: "Cost Savings" },
  { value: 0, suffix: ".00", prefix: "$", label: "Per Betty Answer" },
];
