import React, { useState } from 'react';
import './notes.css';

const Notes = ({ onBack, t }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleToggle = (id) =>
    setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));

  const handleAdd = () => {
    if (!newItem.trim()) return;
    setItems([{ id: Date.now(), text: newItem.trim(), completed: false }, ...items]);
    setNewItem('');
  };

  return (
    <div className="grocery_page">
      <header className="grocery_header">
        <button className="back_circle_btn" onClick={onBack} aria-label={t('back')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="header_text">
          <h1 className="grocery_h1">{t('grocery_list')}</h1>
          <span>{items.filter(i => !i.completed).length} {t('items_left')}</span>
        </div>
      </header>

      <div className="grocery_input_row">
        <input
          className="input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={t('add_new_item')}
        />
        <button className="btn btn--primary" onClick={handleAdd} style={{ padding: '0 20px' }}>+</button>
      </div>

      <div className="grocery_content">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`grocery_card ${item.completed ? 'is_checked' : ''}`}
            onClick={() => handleToggle(item.id)}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="checkbox_ui">
              {item.completed && <div className="inner_check">✓</div>}
            </div>
            <span className="item_name">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
