import { ReactPureCombobox } from './ReactPureCombobox/ReactPureCombobox';

export const mockCategoriesFlat = [
  {
    value: '1',
    label: 'Category 1',
  },
  {
    value: '2',
    label: 'Category 2',
  },
  {
    value: '11',
    label: 'Category 11',
  },
  {
    value: '12',
    label: 'Category 12',
  },
  {
    value: '22',
    label: 'Category 22',
  },
  {
    value: '111',
    label: 'Category 111',
  },
];

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
    <div className="mx-auto w-[300px]">
      <h3>Basic example:</h3>
      <ReactPureCombobox showSearch showCheckboxes list={mockCategories} />

      <h3 className="mt-10">Tags example:</h3>
      <ReactPureCombobox showSearch showTags list={mockCategoriesFlat} />
    </div>
  );
}

export default App;
