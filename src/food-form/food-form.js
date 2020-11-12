import React from 'react';
import config from '../config';
import Context from '../context';
import TokenService from '../services/token-service';
import './food-form.css';
//import PropTypes from 'prop-types';

export default class FoodForm extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    state = {
        newFood: {
            food_item: {
                touched: false,
                value: '',
            },
            quantity: {
                touched: false,
                value: '',
            },
        },
        calories: {
            value: '',
        }
    }

    updateAddFood = (input, value) => {
        this.setState({
            newFood: {
              ...this.state.newFood,
            [input]: {
              touched: true,
              value: value,
            },
          },
        })
    }

    addNewFood = food => {
        fetch(`${config.USER_API_ENDPOINT}/food/:user_id`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
        })
        .then(res => {
            console.log(JSON.stringify(food))
            return res.json()
        })
        .then(resJSON => this.props.handleFoodForm(resJSON))
    }

    getCalories = (res) => {
        fetch(config.FOOD_API_ENDPOINT, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${config.FOOD_API_KEY}`,
              'content-type': 'application/json',
            }
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then(data => this.updateAddFood(data))
            .catch(error => this.setState({ error }))

        let calories = [];
        for (let i = 0; i < res.json.foods.length; i++) {
            for (let j = 0; j < res.json.foods[i].foodNutrients.length; j++) {
                if (res.json.foods[i].foodNutrients[j].nutrientName === 'Energy')
                    {calories.push({
                        name: res.json.foods[i].description, 
                        nutrientValue: res.json.foods[i].foodNutrients[j].value
                        })
                    }
                return calories;
            }
        }
    }

    /*displayResults = (responseJson) => {
        const nutrients = getCalories(responseJson);
        
        document.getElementsByClassName('results-list').empty();
            for (let i = 0; i < responseJson.foods.length; i++) {
                document.getElementsByClassName('results-list').append(
                    <ul>
                        <li>
                            <h3>${responseJson.foods[i].description}</h3>
                            <p>${nutrients[i].nutrientValue}</p>
                        </li>
                    </ul>
                );
            }
    }*/

    render() {
        return (
            <div>
                <form className='food-form' onSubmit={this.props.handleFoodForm}>
                    <fieldset>
                        <legend>Enter Your Food:</legend>
                            <ul>
                                <li>
                                    <label htmlFor='food-item'>Food Item:  </label>
                                        <input 
                                            type='text' 
                                            id='food-item' 
                                            name='food-item' 
                                            placeholder='fat free yogurt'
                                            onChange={(e) => this.updateAddFood('food-item', e.target.value)}
                                        />
                                </li>
                                <li>
                                    <label htmlFor='quantity'>Quantity:  </label>
                                        <input
                                            type='text'
                                            id='quantity'
                                            name='quantity'
                                            placeholder='2/3 cup'
                                            onChange={(e) => this.updateAddFood('quantity', e.target.value)}
                                        />
                                </li>
                            </ul>
                            <br></br>
                            <button 
                                type='submit' 
                                onClick={(e) => this.getCalories(document.getElementById('food-item').value)}>
                                Add Item
                            </button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//FoodForm.propTypes = {}