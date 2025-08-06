import Image from "next/image";
import { DATA_DRAGON_NO_VERSION } from "@/constants/data-dragon";

export function SplashArt({ championName, skinCode = 0, className}) {
    return (
        <Image quality={100}
            src = {`${ DATA_DRAGON_NO_VERSION}/img/champion/splash/${championName}_${skinCode}.jpg`}
            alt = {championName}
            className = {`${className}`}
            fill
            style={{ objectFit:"contain"}}
        />
    );
} 