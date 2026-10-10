import {
  FiCode, FiBarChart2, FiGlobe, FiShield, FiPenTool, FiCpu, FiBriefcase,
  FiMessageCircle, FiUsers, FiZap, FiClock, FiFlag, FiRefreshCw,
} from 'react-icons/fi';

const icons = {
  code: FiCode,
  chart: FiBarChart2,
  globe: FiGlobe,
  shield: FiShield,
  pen: FiPenTool,
  cpu: FiCpu,
  govt: FiBriefcase,
  message: FiMessageCircle,
  users: FiUsers,
  bulb: FiZap,
  clock: FiClock,
  flag: FiFlag,
  refresh: FiRefreshCw,
};

export default function Icon({ name, size = 22 }) {
  const Component = icons[name] || FiCode;
  return <Component size={size} aria-hidden="true" />;
}
