
React app for a book cart

Organization of components:

- There is an App component that includes:
--App
	-Header 
	-Filters
--items

- The 3 main components are:
	-Header
	-Filter
	-Items

How data is passed through components:

-- The book items are passed from app component to filter component
-- Filtered books are passed from filtered component to items component
	-- Filter component is responsible for all kind of data filtering by genre, price, and sorting by rank.
	-- Aggregator or cart state is also calculated within filter component


How the user trigger state changes:

-- By clicking on the filter and sort item buttons, the items are rendered as per the selected criteria and updated filter and sort state.

-- By clicking "ADD" button on each tile item, it adds the item to the cart or increase the counter.

-- By clicking "CLEAR" button in the cart, the item array state is changed to empty


