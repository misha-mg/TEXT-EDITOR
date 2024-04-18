function SelectBlock({ setValue, value }) {
  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  const options = [];
  for (let i = 4; i <= 64; i += 2) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <>
      <select
        className="font-select"
        name="numbers"
        value={value}
        onChange={handleSelectChange}
      >
        {options}
      </select>
    </>
  );
}

export default SelectBlock;
