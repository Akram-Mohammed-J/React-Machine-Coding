import React, { useState, useEffect, useRef } from 'react';
import ListItem from './ListItem';
import Pills from './Pills';
import './AutoComplete.css';
import SearchLoader from '../Loader/Loader';
const AutoComplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uniqueList, setUniqueList] = useState(new Set());
  const [loader, setLoader] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const pills = document.getElementsByClassName('pills-wrapper');
    pills[0]?.scrollTo({
      behavior: 'smooth',
      left: pills[0]?.scrollWidth,
    });
  }, [selectedItems]);

  const deBounce = (callback, wait) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  };

  const searchUsers = (searchTerm) => {
    if (searchTerm && searchTerm !== '') {
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`).then((res) =>
        res.json().then((data) => {
          const { users } = data;
          setSuggestions(users);
        })
      );
    } else {
      selectedItems.pop();
      setSuggestions([]);
    }
    setLoader(false);
  };
  const debouncedSearch = deBounce(searchUsers, 3000);
  return (
    <div className="component-wrapper">
      <div
        className="wrapper-close"
        onClick={() => {
          inputRef?.current.focus();
        }}
      >
        <div className="pills-wrapper">
          {selectedItems.map((item) => (
            <Pills
              key={item.email}
              name={item.firstName}
              image={item.image}
              onRemove={() => {
                const updatedList = selectedItems.filter(
                  (eachItem) => eachItem.id !== item.id
                );
                uniqueList.delete(item.id);
                setSelectedItems(updatedList);
              }}
            />
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          name="Search"
          id="search"
          placeholder="Search.."
          className=""
          onChange={(e) => {
            setLoader(true);
            debouncedSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              (!e.target.value || e.target.value.trim() === '') &&
              e.key === 'Backspace'
            ) {
              const list = [...selectedItems];
              list.pop();
              setSelectedItems(list);
            }
          }}
        />
        <div
          className={
            inputRef?.current && inputRef?.current.value !== ''
              ? 'custom-icon-class'
              : 'hide-close'
          }
          onClick={() => {
            inputRef.current.value = '';
            setSuggestions([]);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      {suggestions.length > 0 && !loader && (
        <div className="suggestions">
          {suggestions.map((user) => {
            return (
              !uniqueList.has(user.id) && (
                <ListItem
                  key={`${user.email + Date.now()}`}
                  image={user.image}
                  name={user.firstName}
                  onSelect={() => {
                    inputRef?.current.focus();
                    setSelectedItems([...selectedItems, user]);
                    setUniqueList(new Set([...uniqueList, user.id]));
                  }}
                />
              )
            );
          })}
        </div>
      )}
      {loader && <SearchLoader width="25px" height="25px" />}
    </div>
  );
};

export default AutoComplete;
