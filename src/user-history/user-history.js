import React from 'react';
import config from '../config';
import Context from '../context';
import { NavLink, withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './user-history.css';

class UserHistory extends React.Component {
    static contextType = Context;

    handleClickDelete = e => {
        e.preventDefault()
        const userId = this.props.userProfile.user_id
        const { history } = this.props;
  
        fetch(`${config.USER_API_ENDPOINT}/${this.props.userProfile.user_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${config.USER_API_TOKEN}`,
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
          })
          .then(() => {
              history.push('/')
              this.context.deleteUser(userId)
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render() {
        const { first_name, last_name, email, gender, height, weight, age } = this.context.userProfile
        return (
            <>
                <h2>Your Profile</h2>
                <ul>
                    <NavLink to='/update-profile' className='profile_nav'>Edit</NavLink>
                    <li>First Name: {first_name}</li>
                    <li>Last Name:  {last_name}</li>
                    <li>Email:  {email}</li>
                    <li>Password:  </li>
                </ul>
                <ul>
                    <NavLink to='/update-info' className='profile_nav'>Edit</NavLink>
                    <li>Gender:  {gender}</li>
                    <li>Height:  {height}</li>
                    <li>Weight:  {weight}</li>
                    <li>Age:  {age}</li>
                </ul>
                <div className='user-button'>
                    <button
                      className='user__delete'
                      type='button'
                      onClick={this.handleClickDelete}
                    >Delete</button>
                </div>
                <Calendar 
                    calendarType='US'
                    defaultView='month'
                    tileContent='<calories>'
                />
                <NavLink to='/log' className='profile_return'>Go Back</NavLink>
            </>
        )
    }
}

export default withRouter(UserHistory);