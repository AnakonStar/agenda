export default function ButtonStylized({ children, onClick, type }) {
    return (
        <button className="buttonStylized" onClick={onClick} type={type}>
            {children}
        </button>
    )
}