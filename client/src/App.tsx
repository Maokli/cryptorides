import React from 'react';
import BasicDatePicker from './components/DateRange';
import Search from './components/SearchBar';
import RangeSlider from './components/RangePrice'
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Search/>
        <BasicDatePicker />
        <RangeSlider/>
      </header>

    </div>
  );
}

export default App;
