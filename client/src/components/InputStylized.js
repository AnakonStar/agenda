export default function InputStylized({ placeholder, value, setValue, type, maxLength, inputMode, pattern }) {
    return (
        <input className="inputStylized" pattern={pattern} inputMode={inputMode} type={type} placeholder={placeholder} value={value} onChange={setValue} maxLength={maxLength} />
    )
}