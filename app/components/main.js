// Include React 
var React = require('react');

// Here we include all of the sub-components
var Saved = require('./Children/Saved');
var Search = require('./Children/Search');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<p><div className="panel panel-primary">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Look up a News articles</h3>
                   </div>
                    <div className="panel-body">

                    <div className="col-md-9">
					
						<Saved setSaved={this.setSaved}/>

					</div>

					<div className="col-md-9">
				
						<Search Articles={this.state.Articles} />

					</div>



                   	</div>
                </div>
               </div>


		)
	}
});

// Export the componen back for use in other files
module.exports = Main;   