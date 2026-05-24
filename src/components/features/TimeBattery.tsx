import { Clock, BatteryFull, BatteryMedium, BatteryLow, BatteryCharging } from 'lucide-react';
import { useTimeBattery } from '@/hooks/useTimeBattery';

export default function TimeBattery() {
  const { time, date, battery, isCharging } = useTimeBattery();

  const batteryColor =
    battery > 50 ? 'text-green-400' : battery > 20 ? 'text-yellow-400' : 'text-red-400';

  const BatteryIcon = isCharging
    ? BatteryCharging
    : battery > 50
      ? BatteryFull
      : battery > 20
        ? BatteryMedium
        : BatteryLow;

  return (
    <div className="glass-card rounded-lg mx-auto max-w-xs px-3 py-1.5 flex items-center justify-between gap-2 animate-fade-in-up">
      <div className="flex items-center gap-1.5">
        <Clock className="size-3 text-primary" />
        <div className="leading-tight">
          <p className="text-xs font-mono tabular-nums text-foreground">{time}</p>
          <p className="text-[10px] text-muted-foreground">{date} • EAT</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <BatteryIcon className={`size-3 ${batteryColor}`} />
        <span className={`text-xs font-mono tabular-nums ${batteryColor}`}>
          {battery}%
        </span>
      </div>
    </div>
  );
}