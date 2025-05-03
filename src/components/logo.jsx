export function Logo({ 
  size = "7xl", 
  padding = "px-2", 
  tracking = "tracking-tighter",
  className = ""
}) {
  return (
    <h1 className={`text-${size} font-black ${tracking} text-white ${className}`}>
      <span className="relative">
        <span className="relative text-white">League</span>
        <span className={`relative inline-block rounded-md bg-[#ff9000] ${padding} text-black`}>Hub</span>
      </span>
    </h1>
  );
}
