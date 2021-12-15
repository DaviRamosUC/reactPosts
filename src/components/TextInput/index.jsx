import './styles.css'
export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <>
            <input
                id='search'
                onChange={handleChange}
                value={searchValue}
                type="search"
                className="input"
                placeholder="Type your search"
            />
        </>
    );
}