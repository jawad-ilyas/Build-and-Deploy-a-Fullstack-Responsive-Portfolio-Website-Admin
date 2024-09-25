
const ContainerForMainSection = ({ children, className }) => {
    return (
        <div className={`bg-gray-200 flex items-center justify-center w-full ${className} `}>
            {children}
        </div>
    )
}

export default ContainerForMainSection