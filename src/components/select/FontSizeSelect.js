function FontSizeSelect({ setValue, value }) {
  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  const MIN_FONT = 4;
  const MAX_FONT = 64;
  const FONT_STEP = 2;

  const options = [];
  function setFontsizeOptions() {
    for (let i = MIN_FONT; i <= MAX_FONT; i += FONT_STEP) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
  }
  setFontsizeOptions();

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

export default FontSizeSelect;
