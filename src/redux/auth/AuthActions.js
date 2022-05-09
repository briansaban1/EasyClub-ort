import { ENDPOINT } from "../../api/Endpoint.js";
import { ActionTypes } from "../ActionTypes";


import NavigationService from "../../navigation/NavigationService.js";


export const loginUser = (user_data,user_resumen) => {

	
	return dispatch => {
		dispatch({ 
			type:ActionTypes.LOGIN_USER,
			payload:{
				user_resumen:user_resumen,
				user_data:user_data
			}
		});		
			
	};
};

export const autoLogin = (email) => {	
	
	return dispatch => {
		dispatch({
			type: ActionTypes.AUTO_LOGIN_SUCCESS,
			payload: email
		});
	};
};
export const updateSignUpProfile = (data) => {	
	return dispatch => {
		dispatch({
			type: ActionTypes.UPDATE_SIGNUP_PROFILE,
			payload: data
		});
	};
};
export const logoutUser = () => {
		
	return dispatch => {
		dispatch({
			type: ActionTypes.LOG_OUT,
			payload: "There was an error connection"
		});
	};
};
export const changedNavigation = (key) => {
		
	return dispatch => {
		dispatch({
			type: ActionTypes.CHANGE_NAVIGATION_KEY,
			payload: key
		});
	};
};

export const updateProfile = (data) => {
			
	return dispatch => {
		dispatch({
			type: ActionTypes.UPDATE_PROFILE,
			payload: data
		});
	};
};

