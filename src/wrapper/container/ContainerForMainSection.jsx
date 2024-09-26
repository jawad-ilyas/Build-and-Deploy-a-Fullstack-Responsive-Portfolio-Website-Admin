
const ContainerForMainSection = ({ children, className }) => {
    return (
        <div className={`bg-gray-200  ${className} `}>
            {children}
        </div>
    )
}

export default ContainerForMainSection