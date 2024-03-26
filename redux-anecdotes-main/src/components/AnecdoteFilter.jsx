import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  const filterHandler = (event) => {
    let filterText = event.target.value;

    dispatch(filterAction(filterText));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search..."
        value={searchTerm || ""}
        onChange={filterHandler}
      />
    </div>
  );
};

export default AnecdoteFilter;
