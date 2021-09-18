export default function StatSection({primary, secondary, percentage, className, bgClass = "bg-tsl"}: {primary: string, secondary: string, percentage: number, className?: string, bgClass?: string}) {
    return (
        <div className={className || ""}>
            <div className="flex items-center">
                <p className="font-bold">{primary}</p>
                <p className="ml-auto text-gray-500">{secondary}</p>
            </div>
            <div className="w-full h-4 bg-gray-100 relative mt-4">
                <div className={`absolute h-4 ${bgClass} top-0 left-0`} style={{width: `${percentage}%`}}/>
            </div>
        </div>
    );
}