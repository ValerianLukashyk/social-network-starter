import { IconContext } from "react-icons";

type PropsType = {
    color?: string | undefined
    size?: string | undefined
    iconClass?: string | undefined
    // children: any
}

export const Icon: React.FC<PropsType> = (props) => {
    const { color = "white", iconClass = "icon", size = '2em', children} = props
    return (
        <IconContext.Provider value={{ color: color, className: iconClass, size: size }}>
            <>{children}</>
        </IconContext.Provider>
    )
}
