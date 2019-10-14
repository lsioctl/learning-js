const fetchData = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"}
];

// make sure the products are sorted by category
const products = fetchData.sort((a, b) => {
    return a.category.localeCompare(b.category);
})

function SearchBar(props) {
    return (
        <form>
            <input 
                type="text" 
                placeholder="Search ..."
                value={props.filterText}
                onChange={props.handleFilterTextChange}
            />
            <p>
                <input 
                    type="checkbox"
                    checked={props.inStockOnly}
                    onChange={props.handleInStockCheckboxChange}
                />
                Only show products in stock
            </p>
        </form>
    );
}

function ProductTable(props) {
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;

    // props.products is sorted
    // TODO: where should we put this sort in real use case ?
    let lastCategory = '';
    const rows = [];

    props.products.forEach(prod => {
        // TODO: performances issues, including call to lowercase ?
        if (prod.name.toLowerCase().indexOf(filterText) === -1) {
            return;
        }
        if (inStockOnly && !prod.stocked) {
            return;
        }
        if (prod.category != lastCategory) {
            rows.push(
                <ProductCategoryRow 
                    category={prod.category}
                    key={prod.category}
                />
            );
        };
        rows.push(
            <ProductRow 
                product={prod}
                key={prod.name}
            />
        );
        lastCategory = prod.category;
    });

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
    
}

function ProductCategoryRow(props) {
    return(
        <tr>
            <th colSpan="2">{props.category}</th>
        </tr>
    );
}

function ProductRow(props) {
    const color = props.product.stocked ? 'default' : 'red';

    return (
        <tr>
            <td>
                <span style={{color: color}}>
                    {props.product.name}
                </span>
            </td>
            <td>{props.product.price}</td>
        </tr>
    )
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        // method don't automatically bind this to the instance
        // in ES6 classes
        // we have to it in constructor or use arrow function
        //console.log(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockCheckboxChange = this.handleInStockCheckboxChange.bind(this);
    }

    handleFilterTextChange(e) {
        // note that e is a synthetic event and can't be access async
        // so below: won't work
        //console.log(e);
        // but here is OK
        // console.log(e.target.value);
        this.setState({ 
            filterText: e.target.value
        });
    }

    handleInStockCheckboxChange(e) {
        this.setState({
            inStockOnly: e.target.checked
        });
    }

    render() {
        return (
            <div>
                <SearchBar 
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                    handleFilterTextChange = {this.handleFilterTextChange}
                    handleInStockCheckboxChange = {this.handleInStockCheckboxChange}
                />
                <ProductTable 
                    products={this.props.products}
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <FilterableProductTable products={products} />,
    document.getElementById('root')
);
