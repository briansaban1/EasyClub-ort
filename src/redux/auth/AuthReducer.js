
import { ActionTypes } from "../ActionTypes";
export const AuthReducer = (
	state = {
		user_data: null,
		user_resumen: null,
		loading: false,
		error: false,
		errorMessage: "",
		navigationKey: "gotohome",
		products: [],
		signUpProfile: {
			flag: 'signup',
			nombre: null,
			apellido: null,
			provincia: null,
			direccion: null,
			cod: null,
			telefono: null,
			correo: null,
			localidad: null,
			username: null,
			password: null,
			TipoUsuario: null,
		}
	},
	action) => {
	switch (action.type) {

		case ActionTypes.LOGIN_USER:
			return {
				...state,
				loading: false,
				loginCompleted: true,
				user_data: action.payload.user_data,
				user_resumen: action.payload.user_resumen
			};

		case ActionTypes.LOG_OUT:
			return {
				...state,
				error: true,
				loading: false,
				loginCompleted: true,
				errorMessage: action.payload.errorMessage
			};
		case ActionTypes.CHANGE_NAVIGATION_KEY:
			return {
				...state,
				navigationKey: action.payload
			};
		case ActionTypes.GET_PRODUCTS:
			return {
				...state,
				products: action.payload
			};
		case ActionTypes.UPDATE_PROFILE:
			return {
				...state,
				user_data: action.payload
			};
		case ActionTypes.UPDATE_SIGNUP_PROFILE:
			return {
				...state,
				signUpProfile: { ...state.signUpProfile, ...action.payload }
			};

		default:
			return state;
	}
};
