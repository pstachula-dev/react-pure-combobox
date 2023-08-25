import reactLogo from './assets/react.svg';
import './App.css';
import { ReactPureCombobox } from './ReactPureCombobox/ReactPureCombobox';

export const mockCategories = [
  {
    value: '1',
    label: 'Category 1',
    parentId: null,
  },
  {
    value: '2',
    label: 'Category 2',
    parentId: null,
  },
  {
    value: '11',
    label: 'Category 11',
    parentId: '1',
  },
  {
    value: '12',
    label: 'Category 12',
    parentId: '1',
  },
  {
    value: '22',
    label: 'Category 22',
    parentId: '2',
  },
  {
    value: '111',
    label: 'Category 111',
    parentId: '12',
  },
];

function App() {
  return (
    <div style={{ height: 2000, width: 500 }}>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h3>Basic example:</h3>
      <ReactPureCombobox
        enableSearch
        onChange={(values) => {
          console.log('values', values);
        }}
        list={mockCategories}
      />

      <h3 className="mt-10">Tags example:</h3>
      <ReactPureCombobox enableSearch showTags list={mockCategories} />
    </div>
  );
}

export default App;
