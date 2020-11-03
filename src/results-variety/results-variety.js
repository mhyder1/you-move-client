import React from 'react';
import Context from '../context';
import { withRouter } from 'react-router-dom';
//import PropTypes from 'prop-types';

class ResultsVariety extends React.Component {
    //props or context needs to live here
    static contextType = Context;
    render() {
        return (
            <div>
                <form className='results-variety-form' onSubmit={this.props.handleResultsVariety}>
                    <fieldset>
                        <legend className='results-variety'>Select a Type of Workout:</legend>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='weights'
                            />
                                <label htmlFor='weights'>Weights</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='cardio'
                            />               
                                <label htmlFor='cardio'>Cardio</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='crossfit'
                            />               
                                <label htmlFor='crossfit'>Crossfit</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='all'
                            />               
                                <label htmlFor='all'>All</label>
                    </fieldset>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ResultsVariety);