import { cn } from "@/lib/utils";

interface SegmentedMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SegmentedMenu = ({ activeTab, onTabChange }: SegmentedMenuProps) => {
  const tabs = ["About", "Itinerary", "Explore"];

  return (
    <div className="flex items-center justify-start">
      <div className="bg-black rounded-full p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === tab
                ? "bg-white text-black"
                : "text-white hover:bg-white/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedMenu;