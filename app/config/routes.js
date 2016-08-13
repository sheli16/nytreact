// Inclue the React library
var React = require('react');

// Include the Router
var Router = require('react-router');
var Route = Router.Route;

//  Include the IndexRoute (catch-all route)
var IndexRoute	= Router.IndexRoute;

// Reference the high-level components
var Main = require('../components/Main');
var Child_saved = require('../components/Children/Saved'); 
var Child_search = require('../components/Children/Search'); 
var GrandChild_result = require('../components/Children/Grandchildren/GrandChild_result');

// Export the Routes
module.exports = (

	/*High level component is the Main component*/
	<Route path='/' component={Main}>

		{/* If user selects Child_saved then show the appropriate component*/}
		<Route path='Child_saved' component={Child_saved} >

			{/*Child_search has its own Grandchildren_result options*/}
			<Route path='GrandChild1' component={GrandChild_result} />
			<Route path='GrandChild2' component={GrandChild_result2} />

			<IndexRoute component={Main} />

		</Route>

);