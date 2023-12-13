import { useEffect } from 'react';
import { useState } from 'react';
import { Add, Delete } from '../../assets/icons';

function Items(props) {
  const [items, setItems] = useState([]);

  const [selectedHub, setSelectedHub] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 300);
  }, [])


  const addItem = () => {
    const newItemName = window.prompt("Введите название элемента:");
    if (newItemName !== null) {
      setItems([...items, newItemName]);
    }
  };

  const deleteItems = () => {
    setItems((prevItems) => {
      const filteredItems = prevItems.filter((item) => item !== selectedHub);
      return filteredItems;
    });
  };

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedHub(newValue);
  };

  return (
    <div className={props.className}>
      <div className="item-panel">
        <button onClick={addItem}>
          <img src={Add} alt="" />
        </button>
        <button onClick={deleteItems}>
          <img src={Delete} alt="" />
        </button>
        <select
          multiple={true}
          className="item-list"
          onChange={handleSelectChange}
        >
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Загрузка данных...</p>}
    </div>
  );
}

export default Items